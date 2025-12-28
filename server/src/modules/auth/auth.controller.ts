import {
    Controller,
    Post,
    Get,
    Body,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { RegisterCustomerDto, LoginDto, RefreshTokenDto } from './dto';
import { JwtAuthGuard, RolesGuard } from './guards';
import { Public, Roles, CurrentUser } from './decorators';
import type { UserInfo } from './interfaces';

@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard) // Apply guards globally to this controller
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
    @Public() // No authentication required
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
            message: 'Đăng ký thành công! Tài khoản của bạn đang chờ được duyệt.',
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
    @Public() // No authentication required
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
    @Public() // No authentication required
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

    /**
     * API lấy thông tin profile
     * GET /auth/profile
     *
     * - Yêu cầu authentication
     * - Trả về thông tin user hiện tại
     */
    @Get('profile')
    @HttpCode(HttpStatus.OK)
    async getProfile(@CurrentUser() user: UserInfo) {
        return {
            success: true,
            data: user,
        };
    }

    /**
     * API dành cho Admin
     * GET /auth/admin-only
     *
     * - Yêu cầu authentication + role ADMIN
     */
    @Get('admin-only')
    @Roles('ADMIN')
    @HttpCode(HttpStatus.OK)
    async adminOnly(@CurrentUser() user: UserInfo) {
        return {
            success: true,
            message: 'Bạn đang truy cập với quyền Admin',
            data: { user },
        };
    }
}
