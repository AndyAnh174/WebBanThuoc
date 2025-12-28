import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    IsEnum,
    IsDateString,
    Matches,
} from 'class-validator';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

/**
 * DTO cho API đăng ký Customer
 * Nhận thông tin người dùng + File giấy phép kinh doanh
 */
export class RegisterCustomerDto {
    @ApiProperty({
        description: 'Email đăng ký',
        example: 'customer@example.com',
    })
    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @ApiProperty({
        description: 'Số điện thoại (định dạng VN)',
        example: '0912345678',
    })
    @IsString({ message: 'Số điện thoại phải là chuỗi' })
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
        message: 'Số điện thoại không hợp lệ (VD: 0912345678)',
    })
    phone: string;

    @ApiProperty({
        description: 'Mật khẩu (tối thiểu 6 ký tự)',
        example: '123456',
        minLength: 6,
    })
    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;

    @ApiProperty({
        description: 'Họ và tên đầy đủ',
        example: 'Nguyễn Văn A',
    })
    @IsString({ message: 'Họ tên phải là chuỗi' })
    @IsNotEmpty({ message: 'Họ tên không được để trống' })
    fullName: string;

    @ApiPropertyOptional({
        description: 'Ngày sinh (ISO format)',
        example: '1990-01-15',
    })
    @IsOptional()
    @IsDateString({}, { message: 'Ngày sinh không hợp lệ' })
    dateOfBirth?: string;

    @ApiPropertyOptional({
        description: 'Giới tính',
        enum: Gender,
        example: Gender.MALE,
    })
    @IsOptional()
    @IsEnum(Gender, { message: 'Giới tính không hợp lệ' })
    gender?: Gender;
}
