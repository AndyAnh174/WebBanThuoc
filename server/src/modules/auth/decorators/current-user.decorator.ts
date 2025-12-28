import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @CurrentUser() decorator
 * Get current authenticated user from request
 *
 * Usage:
 * @Get('profile')
 * getProfile(@CurrentUser() user: UserInfo) {
 *   return user;
 * }
 *
 * @Get('profile')
 * getProfile(@CurrentUser('id') userId: string) {
 *   return userId;
 * }
 */
export const CurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        if (data) {
            return user?.[data];
        }

        return user;
    },
);
