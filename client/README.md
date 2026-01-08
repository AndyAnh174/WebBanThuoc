# 💊 WebBanThuoc - Client

<p align="center">
  <img src="https://nextjs.org/favicon.ico" width="80" alt="Next.js Logo" />
</p>

Frontend cho Website Bán Dược Phẩm, xây dựng trên **Next.js 16**, **TypeScript**, **Tailwind CSS v4** và **shadcn/ui**.

---

## 📋 Mục Lục

- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt & Khởi Chạy](#-cài-đặt--khởi-chạy)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Feature-based Structure](#-feature-based-structure)
- [UI Components](#-ui-components)
- [Scripts](#-scripts)
- [Môi Trường](#-môi-trường)

---

## 🔧 Yêu Cầu Hệ Thống

- **Node.js** >= 18.x
- **pnpm** >= 8.x (khuyến nghị)
- **Server API** đang chạy tại `http://localhost:3001`

---

## 🚀 Cài Đặt & Khởi Chạy

### Bước 1: Cài đặt Dependencies

```bash
cd client
pnpm install
```

### Bước 2: Cấu hình Environment

```bash
# Copy file .env.example thành .env.local
cp .env.example .env.local
```

### Bước 3: Khởi động Development Server

```bash
pnpm dev
```

Truy cập: `http://localhost:3000`

---

## 📁 Cấu Trúc Dự Án

```
client/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout với Header, Footer
│   ├── page.tsx                  # Trang chủ
│   ├── globals.css               # Global styles + CSS variables
│   ├── (auth)/                   # Route group cho auth pages
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/                   # Route group cho shop pages
│   │   ├── products/
│   │   ├── product/[slug]/
│   │   └── category/[slug]/
│   └── (account)/                # Route group cho user pages
│       ├── account/
│       ├── orders/
│       └── wishlist/
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   └── layout/                   # Layout components
│       ├── header.tsx            # Header với navigation
│       ├── footer.tsx            # Footer với links
│       └── index.ts
│
├── features/                     # 🔥 Feature-based modules
│   ├── auth/                     # Authentication feature
│   │   ├── api/                  # API calls (login, register, logout)
│   │   ├── types/                # TypeScript interfaces
│   │   ├── hooks/                # Custom hooks (useAuth)
│   │   ├── components/           # Feature-specific components
│   │   ├── utils/                # Utility functions
│   │   └── index.ts              # Public exports
│   │
│   ├── products/                 # Products feature
│   │   ├── api/                  # API calls (getProducts, getProduct)
│   │   ├── types/                # Product, Category, Manufacturer types
│   │   ├── components/           # ProductCard, ProductList, etc.
│   │   └── index.ts
│   │
│   ├── cart/                     # Shopping cart feature
│   │   ├── api/
│   │   ├── types/
│   │   ├── hooks/                # useCart hook
│   │   └── components/
│   │
│   └── orders/                   # Orders feature
│       ├── api/
│       ├── types/
│       └── components/
│
├── lib/                          # Shared utilities
│   ├── api.ts                    # API client với fetch wrapper
│   ├── config.ts                 # Site config, navigation
│   └── utils.ts                  # cn() và utility functions
│
├── hooks/                        # Global custom hooks
│   └── use-mobile.ts
│
├── public/                       # Static assets
│   ├── images/
│   └── icons/
│
├── components.json               # shadcn/ui config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
└── package.json
```

---

## 🔥 Feature-based Structure

Thay vì gom tất cả API vào một thư mục `api/` dùng chung, chúng ta chia theo từng **feature** (cụm chức năng).

### Ví dụ cấu trúc thư mục Auth:

```
features/
└── auth/
    ├── api/                  # Chứa các hàm fetch (login, register)
    │   └── index.ts
    ├── hooks/                # Logic xử lý chính, form handling
    │   └── use-auth.ts
    ├── types/                # Định nghĩa schema, interfaces dữ liệu
    │   └── index.ts
    ├── components/           # Giao diện (LoginForm, RegisterForm)
    │   ├── login-form.tsx
    │   └── register-form.tsx
    ├── utils/                # Xử lý lỗi (error mapping), định dạng dữ liệu
    │   └── validation.ts
    └── index.ts              # Export public API của feature
```

### Cách sử dụng:

```tsx
// Import từ feature
import { login, logout, type User } from "@/features/auth";
import { getProducts, ProductCard } from "@/features/products";

// Sử dụng
const response = await login({ emailOrPhone: "...", password: "..." });
```

### Lợi ích:

1. **Tổ chức code rõ ràng**: Mỗi feature độc lập, dễ tìm kiếm
2. **Dễ maintain**: Thay đổi trong 1 feature không ảnh hưởng feature khác
3. **Reusable**: Dễ dàng copy/move feature sang project khác
4. **Scalable**: Dễ mở rộng khi thêm feature mới

---

## 🎨 UI Components

Sử dụng **shadcn/ui** (New York style) với các components:

| Component | Mô tả |
|-----------|-------|
| `Button` | Nút bấm với nhiều variants |
| `Card` | Card container |
| `Input` | Form input |
| `DropdownMenu` | Menu dropdown |
| `Sheet` | Side drawer (mobile menu) |
| `Badge` | Badge/Tag |
| `Separator` | Đường phân cách |
| `Skeleton` | Loading placeholder |
| `Sonner` | Toast notifications |
| `ScrollArea` | Scrollable area |
| `Avatar` | Avatar hình tròn |

### Thêm component mới:

```bash
npx shadcn@latest add [component-name]
```

---

## 📜 Scripts

| Script | Mô tả |
|--------|-------|
| `pnpm dev` | Chạy development server |
| `pnpm build` | Build production |
| `pnpm start` | Chạy production server |
| `pnpm lint` | Kiểm tra linting |

---

## 🌐 Môi Trường

Tạo file `.env.local`:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3001

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🎯 Quy Tắc Code

### 1. Import Order

```tsx
// 1. React/Next imports
import { useState } from "react";
import Link from "next/link";

// 2. Third-party libraries
import { toast } from "sonner";

// 3. UI components
import { Button } from "@/components/ui/button";

// 4. Features
import { login, type User } from "@/features/auth";

// 5. Lib/utils
import { cn } from "@/lib/utils";
```

### 2. Naming Conventions

- **Components**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase với prefix `use` (`useAuth.ts`)
- **Utils/API**: camelCase (`getProducts.ts`)
- **Types**: PascalCase (`User`, `Product`)

### 3. Component Structure

```tsx
"use client"; // Nếu cần client-side

import ... // Imports

interface Props { ... } // Types

export function ComponentName({ ... }: Props) {
  // Hooks
  // State
  // Effects
  // Handlers
  
  return (
    // JSX
  );
}
```

---

## 🚧 TODO

- [ ] Thêm pages: `/products`, `/product/[slug]`, `/category/[slug]`
- [ ] Thêm auth pages: `/login`, `/register`
- [ ] Thêm cart feature với Zustand/Context
- [ ] Thêm dark mode toggle
- [ ] Integrate với Backend API

---

## 👥 Đóng Góp

1. Fork repository
2. Tạo branch feature: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Mở Pull Request

---

<p align="center">Made with ❤️ by WebBanThuoc Team</p>
