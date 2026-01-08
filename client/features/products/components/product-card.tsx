import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProductListItem } from "../types";

interface ProductCardProps {
  product: ProductListItem;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / product.originalPrice!) * 100) 
    : 0;
  const isOutOfStock = product.stockQuantity <= 0;

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card className={cn("group overflow-hidden transition-all hover:shadow-lg", className)}>
      <div className="relative aspect-square">
        {/* Product image */}
        <Link href={`/product/${product.slug}`}>
          <div className="relative h-full w-full bg-muted">
            {product.thumbnailUrl ? (
              <Image
                src={product.thumbnailUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl">
                💊
              </div>
            )}
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {hasDiscount && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercent}%
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-yellow-500 text-xs">
              Nổi bật
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="secondary" className="text-xs">
              Hết hàng
            </Badge>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="icon-sm" variant="secondary" className="h-8 w-8 rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon-sm" variant="secondary" className="h-8 w-8 rounded-full">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <Link 
          href={`/category/${product.category.slug}`}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {product.category.name}
        </Link>

        {/* Product name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-semibold line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Manufacturer */}
        <p className="mt-1 text-xs text-muted-foreground">
          {product.manufacturer.name}
        </p>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
          <span className="text-xs text-muted-foreground">/ {product.unit}</span>
        </div>

        {/* Sold count */}
        {product.soldCount > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Đã bán: {product.soldCount}
          </p>
        )}

        {/* Add to cart button */}
        <Button 
          className="mt-3 w-full" 
          size="sm"
          disabled={isOutOfStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ"}
        </Button>
      </CardContent>
    </Card>
  );
}
