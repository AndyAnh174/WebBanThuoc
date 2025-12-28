import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO cho API Login
 * Hỗ trợ đăng nhập bằng email hoặc số điện thoại
 */
export class LoginDto {
    @ApiProperty({
        description: 'Email hoặc số điện thoại',
        example: 'customer@example.com',
        examples: ['customer@example.com', '0912345678'],
    })
    @IsString({ message: 'Email hoặc số điện thoại phải là chuỗi' })
    @IsNotEmpty({ message: 'Email hoặc số điện thoại không được để trống' })
    emailOrPhone: string;

    @ApiProperty({
        description: 'Mật khẩu',
        example: '123456',
        minLength: 6,
    })
    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;
}

/**
 * DTO cho Refresh Token
 */
export class RefreshTokenDto {
    @ApiProperty({
        description: 'Refresh token để lấy access token mới',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    @IsString({ message: 'Refresh token phải là chuỗi' })
    @IsNotEmpty({ message: 'Refresh token không được để trống' })
    refreshToken: string;
}
