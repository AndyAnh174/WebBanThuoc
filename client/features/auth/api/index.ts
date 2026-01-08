import { api, ApiResponse } from "@/lib/api";
import { LoginCredentials, RegisterData, LoginResponse, AuthTokens, User } from "../types";

const AUTH_ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",
  refresh: "/auth/refresh",
  profile: "/auth/profile",
};

/**
 * Đăng nhập
 */
export async function login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
  const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.login, credentials);
  
  // Lưu tokens vào localStorage nếu thành công
  if (response.success && response.data?.tokens) {
    localStorage.setItem("accessToken", response.data.tokens.accessToken);
    localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
  }
  
  return response;
}

/**
 * Đăng ký (với file giấy phép)
 */
export async function register(
  data: RegisterData, 
  licenseFile?: File
): Promise<ApiResponse<{ id: string; email: string; status: string }>> {
  const formData = new FormData();
  
  // Append data fields
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  
  // Append file if exists
  if (licenseFile) {
    formData.append("licenseFile", licenseFile);
  }
  
  // Upload với multipart/form-data
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.register}`, {
      method: "POST",
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      error: "Không thể kết nối đến server",
    };
  }
}

/**
 * Refresh token
 */
export async function refreshToken(refreshTokenValue: string): Promise<ApiResponse<AuthTokens>> {
  const response = await api.post<AuthTokens>(AUTH_ENDPOINTS.refresh, { 
    refreshToken: refreshTokenValue 
  });
  
  // Cập nhật tokens mới
  if (response.success && response.data) {
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }
  
  return response;
}

/**
 * Lấy thông tin profile
 */
export async function getProfile(): Promise<ApiResponse<User>> {
  return api.get<User>(AUTH_ENDPOINTS.profile);
}

/**
 * Đăng xuất
 */
export function logout(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // Redirect to home
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}

/**
 * Kiểm tra đã đăng nhập chưa
 */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
}

/**
 * Lấy access token hiện tại
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}
