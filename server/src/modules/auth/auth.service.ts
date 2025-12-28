import { Injectable } from '@nestjs/common';
import { RegisterCustomerDto } from './dto';

@Injectable()
export class AuthService {
    /**
     * Đăng ký Customer mới
     * TODO: Implement trong commit tiếp theo
     */
    async registerCustomer(
        registerDto: RegisterCustomerDto,
        licenseFile?: Express.Multer.File,
    ) {
        // Placeholder - sẽ implement ở commit 2
        return {
            email: registerDto.email,
            status: 'PENDING',
        };
    }
}
