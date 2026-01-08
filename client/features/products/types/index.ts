// =============================================
// PRODUCT TYPES
// =============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  website?: string;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  unit: string;
  activeIngredient?: string;
  packaging?: string;
  description?: string;
  usageInstructions?: string;
  storageInstructions?: string;
  thumbnailUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  soldCount: number;
  viewCount: number;
  category: Category;
  manufacturer: Manufacturer;
  images?: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

// Product list item (simplified for listing)
export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  originalPrice?: number;
  unit: string;
  thumbnailUrl?: string;
  isFeatured: boolean;
  soldCount: number;
  viewCount: number;
  stockQuantity: number;
  createdAt: string;
  category: Pick<Category, "id" | "name" | "slug">;
  manufacturer: Pick<Manufacturer, "id" | "name" | "slug">;
}

// Query params for products list
export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  manufacturerId?: string;
  isFeatured?: boolean;
  sortBy?: "createdAt" | "price" | "soldCount" | "viewCount";
  sortOrder?: "asc" | "desc";
}

// Search params
export interface ProductSearchParams {
  keyword: string;
  page?: number;
  limit?: number;
}
