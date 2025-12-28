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
import { RegisterCustomerDto, LoginDto, RefreshTokenDto } from './dto';

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

    /**
     * API đăng nhập
     * POST /auth/login
     *
     * - Hỗ trợ đăng nhập bằng email hoặc số điện thoại
     * - Trả về Access Token và Refresh Token
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        const result = await this.authService.login(loginDto);

        return {
            success: true,
            message: 'Đăng nhập thành công',
            data: result,
        };
    }

    /**
     * API refresh token
     * POST /auth/refresh
     *
     * - Gửi refresh token để lấy access token mới
     */
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        const tokens = await this.authService.refreshToken(refreshTokenDto);

        return {
            success: true,
            message: 'Token refreshed successfully',
            data: tokens,
        };
    }
}
