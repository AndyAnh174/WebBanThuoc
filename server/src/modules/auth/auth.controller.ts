import {
    Controller,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { RegisterCustomerDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * API đăng ký Customer
     * POST /auth/register
     *
     * - Nhận thông tin đăng ký + File giấy phép kinh doanh
     * - Lưu user với status = PENDING
     * - Hash password với bcrypt
     */
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('licenseFile'))
    async register(
        @Body() registerDto: RegisterCustomerDto,
        @UploadedFile() licenseFile?: Express.Multer.File,
    ) {
        const result = await this.authService.registerCustomer(
            registerDto,
            licenseFile,
        );

        return {
            success: true,
            message:
                'Đăng ký thành công! Tài khoản của bạn đang chờ được duyệt.',
            data: result,
        };
    }
}
