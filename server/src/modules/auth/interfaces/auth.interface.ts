/**
 * JWT Payload interface
 * Chứa thông tin được mã hóa trong token
 */
export interface JwtPayload {
    sub: string; // User ID
    email: string;
    role: string;
    type: 'access' | 'refresh';
}

/**
 * Token response interface
 */
export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number; // seconds
}

/**
 * User info trong response
 */
export interface UserInfo {
    id: string;
    email: string;
    phone: string;
    fullName: string;
    role: string;
    status: string;
}

/**
 * Login response
 */
export interface LoginResponse {
    user: UserInfo;
    tokens: TokenResponse;
}
