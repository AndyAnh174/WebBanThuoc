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
    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @IsString({ message: 'Số điện thoại phải là chuỗi' })
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
        message: 'Số điện thoại không hợp lệ (VD: 0912345678)',
    })
    phone: string;

    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;

    @IsString({ message: 'Họ tên phải là chuỗi' })
    @IsNotEmpty({ message: 'Họ tên không được để trống' })
    fullName: string;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày sinh không hợp lệ' })
    dateOfBirth?: string;

    @IsOptional()
    @IsEnum(Gender, { message: 'Giới tính không hợp lệ' })
    gender?: Gender;
}
