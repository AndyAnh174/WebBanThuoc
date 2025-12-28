import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO cho API Login
 * Hỗ trợ đăng nhập bằng email hoặc số điện thoại
 */
export class LoginDto {
    @IsString({ message: 'Email hoặc số điện thoại phải là chuỗi' })
    @IsNotEmpty({ message: 'Email hoặc số điện thoại không được để trống' })
    emailOrPhone: string;

    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;
}

/**
 * DTO cho Refresh Token
 */
export class RefreshTokenDto {
    @IsString({ message: 'Refresh token phải là chuỗi' })
    @IsNotEmpty({ message: 'Refresh token không được để trống' })
    refreshToken: string;
}
