import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma';
import { FilesService } from '../files';
import { RegisterCustomerDto } from './dto';

// Số vòng lặp để hash password (cao hơn = an toàn hơn nhưng chậm hơn)
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly filesService: FilesService,
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
    async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
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
