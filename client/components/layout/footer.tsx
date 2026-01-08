import Link from "next/link";
import { 
  Facebook, 
  Phone, 
  Mail, 
  MapPin,
  Clock
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig, footerLinks } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      {/* Newsletter Section */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-primary-foreground">Đăng ký nhận tin khuyến mãi</h3>
              <p className="text-primary-foreground/80 text-sm mt-1">Nhận ngay voucher 50K cho đơn hàng đầu tiên</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="bg-white border-0 h-11 w-full md:w-80"
              />
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 px-6 font-semibold">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl">
                💊
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{siteConfig.name}</h2>
                <p className="text-xs text-muted-foreground">Chất lượng - Uy tín</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {siteConfig.description}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>Hotline: <strong className="text-foreground">{siteConfig.contact.hotline}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>{siteConfig.businessHours}</span>
              </div>
            </div>
          </div>

          {/* About links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Về chúng tôi</h3>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kết nối với chúng tôi</h3>
            <div className="flex items-center gap-3 mb-6">
              <Link 
                href={siteConfig.social.facebook}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href={siteConfig.social.zalo}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors text-xs font-bold"
              >
                Zalo
              </Link>
              <Link 
                href="tel:0901234567"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </Link>
            </div>
            
            <h4 className="font-semibold mb-3">Phương thức thanh toán</h4>
            <div className="flex flex-wrap gap-2">
              {["💳 VISA", "💳 MC", "🏦 Banking", "📱 MoMo", "📱 ZaloPay"].map((method) => (
                <span 
                  key={method} 
                  className="text-xs bg-muted px-2 py-1 rounded"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Copyright */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 {siteConfig.name}. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-primary transition-colors">Điều khoản</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Bảo mật</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
