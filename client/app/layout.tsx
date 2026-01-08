import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header, Footer } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: {
    default: "WebBanThuoc - Nhà thuốc online uy tín",
    template: "%s | WebBanThuoc",
  },
  description: "Website Bán Dược Phẩm - Uy tín, Chất lượng, Giá tốt. Giao hàng nhanh 2h nội thành.",
  keywords: ["thuốc", "dược phẩm", "nhà thuốc online", "mua thuốc online", "thuốc giá rẻ"],
  authors: [{ name: "WebBanThuoc Team" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "WebBanThuoc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
