import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { FilesService } from '../files';
import { RegisterCustomerDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly filesService: FilesService,
    ) { }

    /**
     * Đăng ký Customer mới
     * - Kiểm tra email/phone đã tồn tại chưa
     * - Upload file giấy phép kinh doanh (nếu có)
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

        // Tạo user mới với status = PENDING
        // TODO: Hash password sẽ implement ở commit 3
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: registerDto.email,
                    phone: registerDto.phone,
                    passwordHash: registerDto.password, // TODO: Hash password
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
