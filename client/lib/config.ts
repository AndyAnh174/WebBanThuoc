// Cấu hình chung cho ứng dụng
export const siteConfig = {
  name: "WebBanThuoc",
  description: "Website Bán Dược Phẩm - Uy tín, Chất lượng, Giá tốt",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  
  // SEO
  keywords: ["thuốc", "dược phẩm", "nhà thuốc online", "mua thuốc online", "thuốc giá rẻ"],
  
  // Contact
  contact: {
    phone: "1900 1234",
    email: "support@webbanthuoc.com",
    hotline: "0901 234 567",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
  },
  
  // Social
  social: {
    facebook: "https://facebook.com/webbanthuoc",
    zalo: "https://zalo.me/webbanthuoc",
  },
  
  // Business hours
  businessHours: "8:00 - 22:00 (Thứ 2 - Chủ nhật)",
};

// Navigation links
export const mainNavItems = [
  { title: "Trang chủ", href: "/" },
  { title: "Sản phẩm", href: "/products" },
  { title: "Danh mục", href: "/categories" },
  { title: "Khuyến mãi", href: "/promotions" },
  { title: "Tin tức", href: "/news" },
  { title: "Liên hệ", href: "/contact" },
];

// Footer links
export const footerLinks = {
  about: [
    { title: "Giới thiệu", href: "/about" },
    { title: "Hệ thống cửa hàng", href: "/stores" },
    { title: "Tuyển dụng", href: "/careers" },
    { title: "Liên hệ hợp tác", href: "/partnership" },
  ],
  support: [
    { title: "Hướng dẫn mua hàng", href: "/guide" },
    { title: "Phương thức thanh toán", href: "/payment-methods" },
    { title: "Chính sách vận chuyển", href: "/shipping-policy" },
    { title: "Chính sách đổi trả", href: "/return-policy" },
  ],
  policy: [
    { title: "Điều khoản sử dụng", href: "/terms" },
    { title: "Chính sách bảo mật", href: "/privacy" },
    { title: "Quy chế hoạt động", href: "/regulations" },
  ],
};
