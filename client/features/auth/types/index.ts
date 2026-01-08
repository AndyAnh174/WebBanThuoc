// =============================================
// AUTH TYPES
// =============================================

export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  role: "ADMIN" | "CUSTOMER";
  status: "PENDING" | "ACTIVE" | "REJECTED" | "LOCKED";
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

export interface RegisterData {
  email: string;
  phone: string;
  password: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
