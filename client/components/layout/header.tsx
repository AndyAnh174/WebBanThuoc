"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Phone, 
  Heart,
  ChevronDown,
  MapPin,
  GitCompare,
  LogOut,
  Settings,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig, mainNavItems } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // TODO: Replace with actual auth state
  const isLoggedIn = false;
  const cartItemCount = 0;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar - Green */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex h-9 items-center justify-between text-sm">
            <p className="hidden md:block">
              Chào mừng bạn đến với <strong>{siteConfig.name}</strong>!
            </p>
            <div className="flex items-center gap-4 ml-auto">
              <Link href="/account" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <User className="h-3.5 w-3.5" />
                <span>Tài khoản</span>
              </Link>
              <span className="hidden md:inline text-primary-foreground/50">|</span>
              <div className="hidden md:flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                <span>Hotline: <strong>{siteConfig.contact.hotline}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header - White */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl">
                💊
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary">{siteConfig.name}</h1>
                <p className="text-xs text-muted-foreground">Chất lượng - Uy tín</p>
              </div>
            </Link>

            {/* Search - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Tìm kiếm thuốc, vitamin, thiết bị y tế..."
                  className="pl-4 pr-12 h-11 border-2 border-primary/20 focus:border-primary rounded-full"
                />
                <Button 
                  size="icon" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search - Mobile */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Store locator - Desktop */}
              <Link href="/stores" className="hidden lg:flex">
                <Button variant="ghost" className="flex-col h-auto py-2 px-3 gap-0.5">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-xs">Hệ thống</span>
                </Button>
              </Link>

              {/* Compare - Desktop */}
              <Link href="/compare" className="hidden lg:flex">
                <Button variant="ghost" className="flex-col h-auto py-2 px-3 gap-0.5 relative">
                  <GitCompare className="h-5 w-5 text-primary" />
                  <span className="text-xs">So sánh</span>
                </Button>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="hidden sm:flex">
                <Button variant="ghost" className="flex-col h-auto py-2 px-3 gap-0.5 relative">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="text-xs hidden lg:block">Yêu thích</span>
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" className="flex-col h-auto py-2 px-3 gap-0.5 relative">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    {cartItemCount > 0 && (
                      <Badge 
                        className="absolute -right-2 -top-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-secondary text-secondary-foreground"
                      >
                        {cartItemCount}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs hidden lg:block">Giỏ hàng</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile search */}
          {isSearchOpen && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="pl-4 pr-12 h-11 border-2 border-primary/20 rounded-full"
                  autoFocus
                />
                <Button 
                  size="icon" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation bar - Green */}
      <div className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Categories dropdown - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden lg:flex">
                <Button 
                  className="h-12 gap-2 rounded-none bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-5"
                >
                  <Menu className="h-4 w-4" />
                  Danh mục sản phẩm
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/category/thuoc-khang-sinh">💊 Thuốc kháng sinh</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/thuoc-giam-dau">🩹 Thuốc giảm đau</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/vitamin">🍊 Vitamin & TPCN</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/thuoc-ho-cam">🤧 Thuốc ho - cảm cúm</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/thuoc-tieu-hoa">🫃 Thuốc tiêu hóa</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/categories" className="text-primary font-medium">
                    Xem tất cả danh mục →
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Main navigation - Desktop */}
            <nav className="hidden lg:flex items-center">
              {[
                { title: "Trang chủ", href: "/", active: true },
                { title: "Giới thiệu", href: "/about" },
                { title: "Sản phẩm", href: "/products", hasDropdown: true },
                { title: "Câu hỏi thường gặp", href: "/faq" },
                { title: "Tin tức", href: "/news" },
                { title: "Liên hệ", href: "/contact" },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "h-12 rounded-none text-primary-foreground hover:bg-primary-foreground/10 font-medium",
                      item.active && "bg-primary-foreground/10"
                    )}
                  >
                    {item.title}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4 ml-1" />}
                  </Button>
                </Link>
              ))}
            </nav>

            {/* CTA button */}
            <Link href="/products" className="hidden lg:block ml-auto">
              <Button className="h-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold rounded-full px-6">
                Mua hàng nhanh
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
