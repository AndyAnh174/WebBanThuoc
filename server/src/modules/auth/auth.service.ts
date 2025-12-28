import {
    Injectable,
    ConflictException,
    UnauthorizedException,
    InternalServerErrorException,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma';
import { FilesService } from '../files';
import { RegisterCustomerDto, LoginDto, RefreshTokenDto } from './dto';
import {
    JwtPayload,
    TokenResponse,
    LoginResponse,
} from './interfaces';

// Số vòng lặp để hash password (cao hơn = an toàn hơn nhưng chậm hơn)
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly filesService: FilesService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    /**
     * Hash password với bcrypt
     */
    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    /**
     * So sánh password với hash
     */
    private async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    /**
     * Parse expires string to seconds (e.g., "15m" -> 900)
     */
    private parseExpiresIn(expiresIn: string): number {
        const match = expiresIn.match(/^(\d+)(s|m|h|d)$/);
        if (!match) return 900; // default 15 minutes

        const value = parseInt(match[1], 10);
        const unit = match[2];

        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 60 * 60;
            case 'd':
                return value * 60 * 60 * 24;
            default:
                return 900;
        }
    }

    /**
     * Tạo Access Token và Refresh Token
     */
    private async generateTokens(
        userId: string,
        email: string,
        role: string,
    ): Promise<TokenResponse> {
        const accessPayload: JwtPayload = {
            sub: userId,
            email,
            role,
            type: 'access',
        };

        const refreshPayload: JwtPayload = {
            sub: userId,
            email,
            role,
            type: 'refresh',
        };

        const accessExpiresIn = this.configService.get<string>(
            'jwt.accessTokenExpiresIn',
            '15m',
        );
        const refreshExpiresIn = this.configService.get<string>(
            'jwt.refreshTokenExpiresIn',
            '7d',
        );

        // Convert to seconds for JWT
        const accessExpiresInSeconds = this.parseExpiresIn(accessExpiresIn);
        const refreshExpiresInSeconds = this.parseExpiresIn(refreshExpiresIn);

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(accessPayload, {
                expiresIn: accessExpiresInSeconds,
            }),
            this.jwtService.signAsync(refreshPayload, {
                expiresIn: refreshExpiresInSeconds,
            }),
        ]);

        return {
            accessToken,
            refreshToken,
            expiresIn: accessExpiresInSeconds,
        };
    }

    /**
     * Đăng nhập
     * - Hỗ trợ đăng nhập bằng email hoặc số điện thoại
     * - Kiểm tra trạng thái tài khoản (ACTIVE mới được login)
     * - Trả về Access Token và Refresh Token
     */
    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const { emailOrPhone, password } = loginDto;

        // Tìm user bằng email hoặc phone
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
            },
        });

        if (!user) {
            throw new UnauthorizedException('Email/Số điện thoại hoặc mật khẩu không đúng');
        }

        // Kiểm tra password
        const isPasswordValid = await this.comparePassword(
            password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email/Số điện thoại hoặc mật khẩu không đúng');
        }

        // Kiểm tra trạng thái tài khoản
        if (user.status === 'PENDING') {
            throw new ForbiddenException(
                'Tài khoản của bạn đang chờ được duyệt. Vui lòng chờ admin xác nhận.',
            );
        }

        if (user.status === 'REJECTED') {
            throw new ForbiddenException(
                `Tài khoản của bạn đã bị từ chối. Lý do: ${user.rejectionReason || 'Không xác định'}`,
            );
        }

        if (user.status === 'LOCKED') {
            throw new ForbiddenException(
                'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin.',
            );
        }

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email, user.role);

        return {
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                fullName: user.fullName,
                role: user.role,
                status: user.status,
            },
            tokens,
        };
    }

    /**
     * Refresh Token
     * - Verify refresh token
     * - Generate new access token và refresh token
     */
    async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
        const { refreshToken } = refreshTokenDto;

        try {
            // Verify refresh token
            const payload = await this.jwtService.verifyAsync<JwtPayload>(
                refreshToken,
            );

            // Check if it's a refresh token
            if (payload.type !== 'refresh') {
                throw new UnauthorizedException('Invalid token type');
            }

            // Check if user still exists and is active
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });

            if (!user || user.status !== 'ACTIVE') {
                throw new UnauthorizedException('User not found or inactive');
            }

            // Generate new tokens
            return this.generateTokens(user.id, user.email, user.role);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    /**
     * Đăng ký Customer mới
     * - Kiểm tra email/phone đã tồn tại chưa
     * - Upload file giấy phép kinh doanh (nếu có)
     * - Hash password với bcrypt
     * - Lưu user vào DB với status = PENDING
     */
    async registerCustomer(
        registerDto: RegisterCustomerDto,
        licenseFile?: Express.Multer.File,
    ) {
        // Kiểm tra email đã tồn tại
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });

        if (existingEmail) {
            throw new ConflictException('Email đã được sử dụng');
        }

        // Kiểm tra số điện thoại đã tồn tại
        const existingPhone = await this.prisma.user.findUnique({
            where: { phone: registerDto.phone },
        });

        if (existingPhone) {
            throw new ConflictException('Số điện thoại đã được sử dụng');
        }

        // Upload file giấy phép nếu có
        let licenseFileUrl: string | null = null;

        if (licenseFile) {
            try {
                const uploadResult = await this.filesService.uploadFile(
                    {
                        fieldname: licenseFile.fieldname,
                        originalname: licenseFile.originalname,
                        encoding: licenseFile.encoding,
                        mimetype: licenseFile.mimetype,
                        buffer: licenseFile.buffer,
                        size: licenseFile.size,
                    },
                    {
                        folder: 'licenses', // Folder riêng cho giấy phép
                        isPublic: false, // File private
                        allowedMimeTypes: [
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                            'application/pdf',
                        ],
                        maxSizeBytes: 10 * 1024 * 1024, // Max 10MB
                    },
                );
                licenseFileUrl = uploadResult.path;
            } catch (error) {
                throw new InternalServerErrorException(
                    'Không thể upload file giấy phép. Vui lòng thử lại.',
                );
            }
        }

        // Hash password với bcrypt
        const passwordHash = await this.hashPassword(registerDto.password);

        // Tạo user mới với status = PENDING
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: registerDto.email,
                    phone: registerDto.phone,
                    passwordHash, // Password đã được hash với bcrypt
                    fullName: registerDto.fullName,
                    dateOfBirth: registerDto.dateOfBirth
                        ? new Date(registerDto.dateOfBirth)
                        : null,
                    gender: registerDto.gender,
                    role: 'CUSTOMER',
                    status: 'PENDING', // Chờ admin duyệt
                    licenseFileUrl,
                },
                select: {
                    id: true,
                    email: true,
                    phone: true,
                    fullName: true,
                    status: true,
                    createdAt: true,
                },
            });

            return user;
        } catch (error) {
            // Xóa file đã upload nếu tạo user thất bại
            if (licenseFileUrl) {
                try {
                    await this.filesService.deleteFile(licenseFileUrl);
                } catch {
                    // Ignore delete error
                }
            }

            console.error('Error creating user:', error);
            throw new InternalServerErrorException(
                'Không thể tạo tài khoản. Vui lòng thử lại.',
            );
        }
    }
}
