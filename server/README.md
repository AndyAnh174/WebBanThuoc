# 💊 WebBanThuoc - Server API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

Backend API cho Website Bán Dược Phẩm, xây dựng trên **NestJS** với **Prisma ORM** và **PostgreSQL**.

---

## 📋 Mục Lục

- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt & Khởi Chạy](#-cài-đặt--khởi-chạy)
- [Cấu Hình Environment](#-cấu-hình-environment)
- [Prisma & Database](#-prisma--database)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Scripts](#-scripts)
- [API Documentation](#-api-documentation)

---

## 🔧 Yêu Cầu Hệ Thống

- **Node.js** >= 18.x
- **pnpm** >= 8.x (hoặc npm/yarn)
- **PostgreSQL** 16
- **Redis** 7 (optional - cho caching)
- **MinIO** (optional - cho object storage)
- **Docker & Docker Compose** (khuyến nghị)

---

## 🚀 Cài Đặt & Khởi Chạy

### Bước 1: Clone và Cài đặt Dependencies

```bash
# Di chuyển vào thư mục server
cd server

# Cài đặt dependencies
pnpm install
```

### Bước 2: Cấu hình Environment

```bash
# Copy file .env.example thành .env
cp .env.example .env

# Chỉnh sửa file .env với thông tin của bạn
nano .env  # hoặc dùng editor bất kỳ
```

### Bước 3: Khởi động Services (Docker)

```bash
# Khởi động PostgreSQL, Redis, MinIO
docker-compose up -d
```

### Bước 4: Setup Database với Prisma

```bash
# Generate Prisma Client
pnpm prisma:generate

# Chạy migrations
pnpm prisma:migrate

# (Optional) Seed dữ liệu mẫu
pnpm prisma:seed
```

### Bước 5: Khởi động Server

```bash
# Development mode (hot-reload)
pnpm start:dev

# Production mode
pnpm start:prod
```

Server sẽ chạy tại: `http://localhost:3001`

---

## ⚙️ Cấu Hình Environment

Tạo file `.env` từ `.env.example` và cập nhật các giá trị sau:

```env
# ----------------------
# App Configuration
# ----------------------
NODE_ENV=development
PORT=3001

# ----------------------
# PostgreSQL 16
# ----------------------
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=webbanthuoc

# Connection URL for Prisma
DATABASE_URL=postgresql://admin:admin123@localhost:5432/webbanthuoc

# ----------------------
# Redis 7
# ----------------------
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis123
REDIS_URL=redis://:redis123@localhost:6379

# ----------------------
# MinIO S3 Self-hosted
# ----------------------
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin123

# ----------------------
# JWT & Security
# ----------------------
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# ----------------------
# CORS
# ----------------------
CORS_ORIGINS=http://localhost:3001,http://localhost:3000
```

---

## 🗄️ Prisma & Database

### Các lệnh Prisma thường dùng

| Lệnh | Mô tả |
|------|-------|
| `pnpm prisma:generate` | Tạo Prisma Client từ schema |
| `pnpm prisma:migrate` | Tạo và chạy migration (development) |
| `pnpm prisma:migrate:prod` | Deploy migrations (production) |
| `pnpm prisma:studio` | Mở Prisma Studio GUI |
| `pnpm prisma:push` | Push schema lên DB (không tạo migration) |
| `pnpm prisma:seed` | Seed dữ liệu mẫu |

### Quy trình làm việc với Prisma

#### 🔄 Lần đầu setup / Clone repo mới:

```bash
# 1. Generate Prisma Client
pnpm prisma:generate

# 2. Chạy tất cả migrations
pnpm prisma:migrate
```

#### ✏️ Khi thay đổi schema.prisma:

```bash
# 1. Tạo migration mới
pnpm prisma:migrate

# Prisma sẽ hỏi tên migration, ví dụ: add_new_field
```

#### 👀 Xem và chỉnh sửa dữ liệu:

```bash
# Mở Prisma Studio trên trình duyệt
pnpm prisma:studio

# Truy cập: http://localhost:5555
```

#### ⚡ Development nhanh (không cần migration):

```bash
# Đồng bộ schema trực tiếp với database
# ⚠️ Chỉ dùng trong development!
pnpm prisma:push
```

#### 🔍 Xem trạng thái migrations:

```bash
npx prisma migrate status
```

### Database Schema Overview

Schema bao gồm các model chính:

| Model | Mô tả |
|-------|-------|
| `User` | Quản lý người dùng (Admin/Customer) |
| `Address` | Địa chỉ giao hàng |
| `Category` | Danh mục sản phẩm |
| `Manufacturer` | Nhà sản xuất |
| `Product` | Sản phẩm dược phẩm |
| `ProductImage` | Hình ảnh sản phẩm |
| `Favorite` | Sản phẩm yêu thích |
| `Order` | Đơn hàng |
| `OrderItem` | Chi tiết đơn hàng |
| `Coupon` | Mã giảm giá |
| `Conversation` | Cuộc hội thoại chat |
| `Message` | Tin nhắn |
| `News` | Tin tức/Sự kiện/Khuyến mãi |
| `Banner` | Banner quảng cáo |
| `CompanyInfo` | Thông tin công ty |
| `Contact` | Form liên hệ |
| `Setting` | Cài đặt hệ thống |
| `AuditLog` | Nhật ký hoạt động |

---

## 📁 Cấu Trúc Dự Án

```
server/
├── prisma/
│   └── schema.prisma        # Prisma schema definition
├── src/
│   ├── config/              # Configuration modules
│   ├── modules/             # Feature modules
│   ├── prisma/              # Prisma service
│   ├── app.module.ts        # Root module
│   ├── app.controller.ts    # Root controller
│   ├── app.service.ts       # Root service
│   └── main.ts              # Entry point
├── test/                    # Test files
├── .env.example             # Environment template
├── docker-compose.yml       # Docker services
├── nest-cli.json            # NestJS CLI config
├── package.json             # Dependencies
├── prisma.config.ts         # Prisma configuration
└── tsconfig.json            # TypeScript config
```

---

## 📜 Scripts

### Development

```bash
pnpm start:dev      # Chạy development với hot-reload
pnpm start:debug    # Chạy với debugger
```

### Production

```bash
pnpm build          # Build production
pnpm start:prod     # Chạy production
```

### Testing

```bash
pnpm test           # Unit tests
pnpm test:watch     # Unit tests với watch mode
pnpm test:cov       # Test coverage
pnpm test:e2e       # End-to-end tests
```

### Code Quality

```bash
pnpm lint           # ESLint check & fix
pnpm format         # Prettier format
```

### Prisma

```bash
pnpm prisma:generate       # Generate Prisma Client
pnpm prisma:migrate        # Run migrations (dev)
pnpm prisma:migrate:prod   # Deploy migrations (prod)
pnpm prisma:studio         # Open Prisma Studio
pnpm prisma:push           # Push schema to DB
pnpm prisma:seed           # Seed database
```

---

## 📚 API Documentation

*(Coming soon - Swagger documentation)*

API sẽ được document tại: `http://localhost:3001/api/docs`

---

## 🐳 Docker Commands

```bash
# Khởi động tất cả services
docker-compose up -d

# Dừng services
docker-compose down

# Xem logs
docker-compose logs -f

# Khởi động lại PostgreSQL
docker-compose restart postgres
```

---

## 🔥 Troubleshooting

### Lỗi kết nối Database

```bash
# Kiểm tra PostgreSQL đang chạy
docker-compose ps

# Kiểm tra connection string
echo $DATABASE_URL

# Reset database (⚠️ XÓA HẾT DATA)
npx prisma migrate reset
```

### Lỗi Prisma Client

```bash
# Xóa và generate lại
rm -rf node_modules/.prisma
pnpm prisma:generate
```

### Port đã được sử dụng

```bash
# Tìm process đang dùng port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

---

## 👥 Đóng Góp

1. Fork repository
2. Tạo branch feature: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Mở Pull Request

---

## 📄 License

MIT License - Xem [LICENSE](../LICENSE) để biết thêm chi tiết.

---

<p align="center">Made with ❤️ by WebBanThuoc Team</p>
