import { api, ApiResponse, PaginatedResponse } from "@/lib/api";
import { Product, ProductListItem, ProductsQueryParams, ProductSearchParams } from "../types";

const PRODUCTS_ENDPOINTS = {
  list: "/products",
  detail: (idOrSlug: string) => `/products/${idOrSlug}`,
  search: "/products/search",
};

/**
 * Lấy danh sách sản phẩm với phân trang và filter
 */
export async function getProducts(
  params: ProductsQueryParams = {}
): Promise<ApiResponse<PaginatedResponse<ProductListItem>>> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.categoryId) searchParams.set("categoryId", params.categoryId);
  if (params.manufacturerId) searchParams.set("manufacturerId", params.manufacturerId);
  if (params.isFeatured !== undefined) searchParams.set("isFeatured", String(params.isFeatured));
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder);
  
  const queryString = searchParams.toString();
  const endpoint = queryString ? `${PRODUCTS_ENDPOINTS.list}?${queryString}` : PRODUCTS_ENDPOINTS.list;
  
  return api.get<PaginatedResponse<ProductListItem>>(endpoint);
}

/**
 * Lấy chi tiết sản phẩm theo ID hoặc slug
 */
export async function getProduct(idOrSlug: string): Promise<ApiResponse<Product>> {
  return api.get<Product>(PRODUCTS_ENDPOINTS.detail(idOrSlug));
}

/**
 * Tìm kiếm sản phẩm
 */
export async function searchProducts(
  params: ProductSearchParams
): Promise<ApiResponse<PaginatedResponse<ProductListItem> & { keyword: string }>> {
  const searchParams = new URLSearchParams();
  
  searchParams.set("keyword", params.keyword);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  
  return api.get<PaginatedResponse<ProductListItem> & { keyword: string }>(
    `${PRODUCTS_ENDPOINTS.search}?${searchParams.toString()}`
  );
}

/**
 * Lấy sản phẩm nổi bật
 */
export async function getFeaturedProducts(
  limit: number = 8
): Promise<ApiResponse<PaginatedResponse<ProductListItem>>> {
  return getProducts({ isFeatured: true, limit });
}

/**
 * Lấy sản phẩm bán chạy
 */
export async function getBestSellerProducts(
  limit: number = 8
): Promise<ApiResponse<PaginatedResponse<ProductListItem>>> {
  return getProducts({ sortBy: "soldCount", sortOrder: "desc", limit });
}

/**
 * Lấy sản phẩm mới nhất
 */
export async function getLatestProducts(
  limit: number = 8
): Promise<ApiResponse<PaginatedResponse<ProductListItem>>> {
  return getProducts({ sortBy: "createdAt", sortOrder: "desc", limit });
}
