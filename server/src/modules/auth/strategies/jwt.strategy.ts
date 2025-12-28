import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma';
import { JwtPayload } from '../interfaces';

/**
 * JWT Strategy for authentication
 * Validates JWT token and attaches user to request
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>(
                'jwt.secret',
                'default-secret-change-in-production',
            ),
        });
    }

    /**
     * Validate JWT payload
     * Called automatically when token is valid
     */
    async validate(payload: JwtPayload) {
        // Only accept access tokens, not refresh tokens
        if (payload.type !== 'access') {
            throw new UnauthorizedException('Invalid token type');
        }

        // Check if user exists and is active
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: {
                id: true,
                email: true,
                phone: true,
                fullName: true,
                role: true,
                status: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user.status !== 'ACTIVE') {
            throw new UnauthorizedException('User account is not active');
        }

        // Attach user to request (accessible via @CurrentUser decorator)
        return user;
    }
}
