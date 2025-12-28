import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * @Roles() decorator
 * Restrict access to users with specific roles
 *
 * Usage:
 * @Roles('ADMIN')
 * @Get('admin-only')
 * getAdminData() { ... }
 *
 * @Roles('ADMIN', 'CUSTOMER')
 * @Get('users-only')
 * getUserData() { ... }
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
