import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m', // 15 phút
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d', // 7 ngày
}));
