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
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterCustomerDto, LoginDto, RefreshTokenDto } from './dto';
import { JwtAuthGuard, RolesGuard } from './guards';
import { Public, Roles, CurrentUser } from './decorators';
import type { UserInfo } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * API đăng ký Customer
     */
    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('licenseFile'))
    @ApiOperation({
        summary: 'Đăng ký tài khoản Customer',
        description:
            'Đăng ký tài khoản mới với thông tin cá nhân và file giấy phép kinh doanh (optional). Tài khoản sẽ ở trạng thái PENDING chờ admin duyệt.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            required: ['email', 'phone', 'password', 'fullName'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    example: 'customer@example.com',
                },
                phone: {
                    type: 'string',
                    example: '0912345678',
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    example: '123456',
                },
                fullName: {
                    type: 'string',
                    example: 'Nguyễn Văn A',
                },
                dateOfBirth: {
                    type: 'string',
                    format: 'date',
                    example: '1990-01-15',
                },
                gender: {
                    type: 'string',
                    enum: ['MALE', 'FEMALE', 'OTHER'],
                },
                licenseFile: {
                    type: 'string',
                    format: 'binary',
                    description: 'File giấy phép kinh doanh (PDF, JPG, PNG - max 10MB)',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Đăng ký thành công',
        schema: {
            example: {
                success: true,
                message: 'Đăng ký thành công! Tài khoản của bạn đang chờ được duyệt.',
                data: {
                    id: 'uuid',
                    email: 'customer@example.com',
                    phone: '0912345678',
                    fullName: 'Nguyễn Văn A',
                    status: 'PENDING',
                    createdAt: '2024-01-01T00:00:00.000Z',
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
    @ApiResponse({ status: 409, description: 'Email hoặc số điện thoại đã tồn tại' })
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
     */
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Đăng nhập',
        description:
            'Đăng nhập bằng email hoặc số điện thoại. Tài khoản phải ở trạng thái ACTIVE.',
    })
    @ApiResponse({
        status: 200,
        description: 'Đăng nhập thành công',
        schema: {
            example: {
                success: true,
                message: 'Đăng nhập thành công',
                data: {
                    user: {
                        id: 'uuid',
                        email: 'customer@example.com',
                        phone: '0912345678',
                        fullName: 'Nguyễn Văn A',
                        role: 'CUSTOMER',
                        status: 'ACTIVE',
                    },
                    tokens: {
                        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        expiresIn: 900,
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Email/mật khẩu không đúng' })
    @ApiResponse({ status: 403, description: 'Tài khoản chưa được duyệt hoặc bị khóa' })
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
     */
    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Refresh Token',
        description: 'Sử dụng refresh token để lấy access token mới.',
    })
    @ApiResponse({
        status: 200,
        description: 'Token refreshed thành công',
        schema: {
            example: {
                success: true,
                message: 'Token refreshed successfully',
                data: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    expiresIn: 900,
                },
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Refresh token không hợp lệ hoặc hết hạn' })
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
     */
    @Get('profile')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Lấy thông tin profile',
        description: 'Lấy thông tin của user đang đăng nhập. Yêu cầu authentication.',
    })
    @ApiResponse({
        status: 200,
        description: 'Thành công',
        schema: {
            example: {
                success: true,
                data: {
                    id: 'uuid',
                    email: 'customer@example.com',
                    phone: '0912345678',
                    fullName: 'Nguyễn Văn A',
                    role: 'CUSTOMER',
                    status: 'ACTIVE',
                },
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token không hợp lệ' })
    async getProfile(@CurrentUser() user: UserInfo) {
        return {
            success: true,
            data: user,
        };
    }

    /**
     * API dành cho Admin
     */
    @Get('admin-only')
    @Roles('ADMIN')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: '[Admin] Test phân quyền',
        description: 'Endpoint chỉ dành cho Admin. Dùng để test phân quyền role.',
    })
    @ApiResponse({
        status: 200,
        description: 'Bạn có quyền Admin',
        schema: {
            example: {
                success: true,
                message: 'Bạn đang truy cập với quyền Admin',
                data: {
                    user: {
                        id: 'uuid',
                        email: 'admin@example.com',
                        role: 'ADMIN',
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Không có quyền Admin' })
    async adminOnly(@CurrentUser() user: UserInfo) {
        return {
            success: true,
            message: 'Bạn đang truy cập với quyền Admin',
            data: { user },
        };
    }
}
