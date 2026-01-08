import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary w-fit">
                <ShieldCheck className="h-4 w-4" />
                Thuốc chính hãng 100%
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Nhà thuốc online{" "}
                <span className="text-primary">uy tín hàng đầu</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Cung cấp đầy đủ các loại thuốc, vitamin, thiết bị y tế với giá cả hợp lý. 
                Giao hàng nhanh 2 giờ nội thành.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    Xem sản phẩm
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Tìm hiểu thêm
                  </Button>
                </Link>
              </div>
              
              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Giao nhanh 2h</p>
                    <p className="text-xs text-muted-foreground">Nội thành</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Mở cửa 8h-22h</p>
                    <p className="text-xs text-muted-foreground">Cả tuần</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Tư vấn 24/7</p>
                    <p className="text-xs text-muted-foreground">Miễn phí</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hero image placeholder */}
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-9xl">💊</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Danh mục sản phẩm</h2>
            <p className="text-muted-foreground mt-1">Khám phá các danh mục dược phẩm</p>
          </div>
          <Link href="/categories">
            <Button variant="ghost" className="gap-2">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: "Thuốc kháng sinh", emoji: "💊", slug: "thuoc-khang-sinh" },
            { name: "Thuốc giảm đau", emoji: "🩹", slug: "thuoc-giam-dau" },
            { name: "Vitamin & TPCN", emoji: "🍊", slug: "vitamin-thuc-pham-chuc-nang" },
            { name: "Thuốc ho - cảm", emoji: "🤧", slug: "thuoc-ho-cam-cum" },
            { name: "Thuốc tiêu hóa", emoji: "🫃", slug: "thuoc-tieu-hoa" },
          ].map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </span>
                  <span className="font-medium text-sm">{category.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Sản phẩm nổi bật</h2>
              <p className="text-muted-foreground mt-1">Các sản phẩm được khách hàng tin dùng</p>
            </div>
            <Link href="/products?featured=true">
              <Button variant="ghost" className="gap-2">
                Xem tất cả
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Product grid placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-6xl opacity-50">💊</span>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Danh mục</p>
                  <h3 className="font-semibold mt-1 line-clamp-2">Sản phẩm mẫu #{i}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Nhà sản xuất</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">150.000 ₫</span>
                    <span className="text-xs text-muted-foreground">/ hộp</span>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Thêm vào giỏ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  Đăng ký để nhận ưu đãi
                </h2>
                <p className="mt-2 text-primary-foreground/80">
                  Nhận ngay voucher giảm 10% cho đơn hàng đầu tiên khi đăng ký tài khoản
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Đăng ký ngay
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}