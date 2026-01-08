// Base API client cho frontend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Fetch wrapper với error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Thêm token nếu có
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Có lỗi xảy ra",
      };
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: "Không thể kết nối đến server",
    };
  }
}

// HTTP Methods
export const api = {
  get: <T>(endpoint: string) => fetchApi<T>(endpoint, { method: "GET" }),
  
  post: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
    
  put: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
    
  patch: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
    
  delete: <T>(endpoint: string) => fetchApi<T>(endpoint, { method: "DELETE" }),
};

// Upload file (multipart/form-data)
export async function uploadFile(
  endpoint: string,
  formData: FormData
): Promise<ApiResponse<{ url: string; path: string }>> {
  const url = `${API_URL}${endpoint}`;
  
  const headers: HeadersInit = {};
  
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Upload thất bại",
      };
    }

    return data;
  } catch (error) {
    console.error("Upload Error:", error);
    return {
      success: false,
      error: "Không thể upload file",
    };
  }
}
