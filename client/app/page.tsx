import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample categories data
const categories = [
  { name: "Thuốc kháng sinh", emoji: "💊", slug: "thuoc-khang-sinh", bg: "bg-blue-50" },
  { name: "Vitamin", emoji: "🍊", slug: "vitamin-thuc-pham-chuc-nang", bg: "bg-orange-50" },
  { name: "Thuốc giảm đau", emoji: "🩹", slug: "thuoc-giam-dau", bg: "bg-red-50" },
  { name: "Thuốc ho", emoji: "🤧", slug: "thuoc-ho-cam-cum", bg: "bg-yellow-50" },
  { name: "Thuốc tiêu hóa", emoji: "🫃", slug: "thuoc-tieu-hoa", bg: "bg-green-50" },
  { name: "Thực phẩm", emoji: "🥗", slug: "thuc-pham-chuc-nang", bg: "bg-emerald-50" },
  { name: "Thiết bị y tế", emoji: "🩺", slug: "thiet-bi-y-te", bg: "bg-cyan-50" },
  { name: "Chăm sóc sắc đẹp", emoji: "💄", slug: "cham-soc-sac-dep", bg: "bg-pink-50" },
];

// Sample products
const featuredProducts = [
  { id: 1, name: "Paracetamol 500mg", price: 25000, originalPrice: 35000, unit: "hộp", sold: 1250, rating: 4.8 },
  { id: 2, name: "Vitamin C 1000mg", price: 125000, originalPrice: null, unit: "hộp", sold: 890, rating: 4.9 },
  { id: 3, name: "Amoxicillin 500mg", price: 45000, originalPrice: 55000, unit: "hộp", sold: 756, rating: 4.7 },
  { id: 4, name: "Omega-3 Fish Oil", price: 185000, originalPrice: 220000, unit: "hộp", sold: 432, rating: 4.6 },
  { id: 5, name: "Calcium D3", price: 145000, originalPrice: null, unit: "hộp", sold: 678, rating: 4.8 },
  { id: 6, name: "Glucosamine 1500mg", price: 285000, originalPrice: 320000, unit: "hộp", sold: 345, rating: 4.7 },
  { id: 7, name: "Probiotics 10B CFU", price: 195000, originalPrice: null, unit: "hộp", sold: 567, rating: 4.9 },
  { id: 8, name: "Multivitamin Daily", price: 165000, originalPrice: 189000, unit: "hộp", sold: 823, rating: 4.8 },
];

// Format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent to-primary/10">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left content */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-primary">Dược Phẩm</span><br />
                <span className="text-secondary">Giảm Giá Lớn</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground italic">
                Tiết kiệm tới <strong className="text-primary">50%</strong> cho đơn hàng đầu tiên của bạn
              </p>
              <div>
                <Link href="/products">
                  <Button size="lg" className="gap-2 rounded-full font-semibold px-8">
                    ĐẶT NGAY
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right - Hero image placeholder */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <span className="text-8xl">💊🏥💉</span>
                  <p className="mt-4 text-muted-foreground">Hero Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Danh mục nổi bật</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Category tabs */}
            <div className="hidden md:flex items-center gap-4 mr-4">
              <button className="text-sm font-medium text-primary hover:underline">Trái cây</button>
              <button className="text-sm text-muted-foreground hover:text-primary">Rau củ quả</button>
              <button className="text-sm text-muted-foreground hover:text-primary">Thực phẩm sạch</button>
            </div>
            {/* Navigation arrows */}
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Categories grid - circular style */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="group">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${category.bg} flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-transparent group-hover:border-primary`}>
                  <span className="text-2xl md:text-3xl">{category.emoji}</span>
                </div>
                <span className="text-xs md:text-sm text-center font-medium line-clamp-2">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-accent/30">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Sản phẩm nổi bật</h2>
              <p className="text-muted-foreground mt-1">Các sản phẩm được khách hàng tin dùng</p>
            </div>
            <Link href="/products?featured=true">
              <Button variant="ghost" className="gap-2 text-primary">
                Xem tất cả
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => {
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;
              const discountPercent = hasDiscount 
                ? Math.round((1 - product.price / product.originalPrice!) * 100) 
                : 0;
                
              return (
                <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Product image */}
                  <div className="relative aspect-square bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform">💊</span>
                    </div>
                    
                    {/* Discount badge */}
                    {hasDiscount && (
                      <Badge className="absolute left-2 top-2 bg-red-500 text-white">
                        -{discountPercent}%
                      </Badge>
                    )}
                    
                    {/* Quick add button */}
                    <Button 
                      size="icon" 
                      className="absolute right-2 bottom-2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    {/* Product name */}
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">| Đã bán {product.sold}</span>
                    </div>
                    
                    {/* Price */}
                    <div className="mt-3 flex items-baseline gap-2 flex-wrap">
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
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Bán chạy nhất</h2>
            <p className="text-muted-foreground mt-1">Top sản phẩm bán chạy trong tuần</p>
          </div>
          <Link href="/products?sort=soldCount">
            <Button variant="ghost" className="gap-2 text-primary">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* Horizontal scroll products */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
          {featuredProducts.slice(0, 6).map((product, index) => (
            <Card key={product.id} className="shrink-0 w-[180px] md:w-[220px] overflow-hidden snap-start">
              <div className="relative aspect-square bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-50">💊</span>
                </div>
                {/* Ranking badge */}
                <div className="absolute left-2 top-2 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                <div className="mt-2 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{product.rating}</span>
                </div>
                <p className="mt-1 font-bold text-primary">{formatPrice(product.price)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="container mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
          <CardContent className="p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div>
                <Badge className="bg-secondary text-secondary-foreground mb-4">
                  🎁 Ưu đãi đặc biệt
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Đăng ký để nhận voucher giảm 10%
                </h2>
                <p className="mt-2 text-primary-foreground/80">
                  Nhận ngay voucher giảm giá cho đơn hàng đầu tiên khi đăng ký tài khoản
                </p>
              </div>
              <div className="flex justify-end">
                <Link href="/register">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold rounded-full px-8">
                    Đăng ký ngay
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Giao hàng nhanh", desc: "Trong 2 giờ nội thành" },
            { icon: "✅", title: "Thuốc chính hãng", desc: "100% nguồn gốc rõ ràng" },
            { icon: "💳", title: "Thanh toán đa dạng", desc: "COD, Banking, Ví điện tử" },
            { icon: "📞", title: "Hỗ trợ 24/7", desc: "Tư vấn miễn phí" },
          ].map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-accent/50">
              <span className="text-3xl">{feature.icon}</span>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}