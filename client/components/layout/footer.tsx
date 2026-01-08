import Link from "next/link";
import { 
  Facebook, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  CreditCard,
  Truck,
  Shield,
  Headphones
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteConfig, footerLinks } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      {/* Features bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Giao hàng nhanh</h4>
                <p className="text-xs text-muted-foreground">Trong 2 giờ nội thành</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Thuốc chính hãng</h4>
                <p className="text-xs text-muted-foreground">100% nguồn gốc rõ ràng</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Thanh toán dễ dàng</h4>
                <p className="text-xs text-muted-foreground">Nhiều hình thức thanh toán</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Hỗ trợ 24/7</h4>
                <p className="text-xs text-muted-foreground">Tư vấn miễn phí</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                💊
              </div>
              <span className="text-xl font-bold text-primary">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {siteConfig.description}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>Hotline: <strong className="text-foreground">{siteConfig.contact.hotline}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{siteConfig.businessHours}</span>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex items-center gap-3 mt-4">
              <Link 
                href={siteConfig.social.facebook}
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link 
                href={siteConfig.social.zalo}
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-bold"
              >
                Zalo
              </Link>
            </div>
          </div>

          {/* About links */}
          <div>
            <h3 className="font-semibold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy links */}
          <div>
            <h3 className="font-semibold mb-4">Chính sách</h3>
            <ul className="space-y-2">
              {footerLinks.policy.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Copyright */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 {siteConfig.name}. Tất cả quyền được bảo lưu.</p>
          <p>Giấy phép ĐKKD số: 0123456789 do Sở KH&ĐT TP.HCM cấp ngày 01/01/2024</p>
        </div>
      </div>
    </footer>
  );
}
