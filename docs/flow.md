# PROJECT FLOW - WEBSITE BÁN DƯỢC PHẨM

> **Dự án:** WebBanThuoc  
> **Timeline:** 27/12/2025 - 09/02/2026 (6 tuần)  
> **Quản lý theo:** Plane.so Style

---

## 📅 CYCLES (Giai đoạn)

| Cycle | Tên | Thời gian | Mục tiêu |
|-------|-----|-----------|----------|
| 1 | Setup & Foundation | 27/12 - 05/01 | Thiết lập môi trường, cấu trúc dự án |
| 2 | Core Backend & Auth | 06/01 - 15/01 | API Authentication, Products, Orders |
| 3 | Core Frontend | 16/01 - 25/01 | UI/UX chính, tích hợp API |
| 4 | Advanced Features | 26/01 - 02/02 | Payment, Chat, Admin Panel |
| 5 | Testing & Launch | 03/02 - 09/02 | Testing, Bug fixes, Deployment |

---

## 🏷️ LABELS

| Label | Mô tả | Color |
|-------|-------|-------|
| `BE` | Backend (Django) | 🔵 Blue |
| `FE` | Frontend (NextJS) | 🟢 Green |
| `DevOps` | Infrastructure, Deployment | 🟠 Orange |
| `DB` | Database design/migration | 🟣 Purple |
| `API` | API Development | 🔴 Red |

---

## 📝 STATUS LEGEND

| Icon | Status | Mô tả |
|------|--------|-------|
| ⬜ | Backlog | Chưa bắt đầu |
| 🔄 | In Progress | Đang thực hiện |
| 👀 | In Review | Đang review |
| ✅ | Done | Hoàn thành |
| ❌ | Cancelled | Đã hủy |
| 🚫 | Blocked | Bị chặn |

---

# 📦 MODULES

---

## Module: Infrastructure & DevOps

> Thiết lập hạ tầng, CI/CD, deployment

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| INFRA-001 | Setup Git repository & branching strategy | `DevOps` | Cycle 1 | 🔴 High | 27/12 | 27/12 | ⬜ Backlog |
| INFRA-002 | Setup Docker Compose (Django, PostgreSQL, Redis, MinIO) | `DevOps` | Cycle 1 | 🔴 High | 27/12 | 28/12 | ⬜ Backlog |
| INFRA-003 | Cấu hình PostgreSQL 16 database | `DevOps` `DB` | Cycle 1 | 🔴 High | 28/12 | 28/12 | ⬜ Backlog |
| INFRA-004 | Setup MinIO cho file storage | `DevOps` | Cycle 1 | 🔴 High | 28/12 | 29/12 | ⬜ Backlog |
| INFRA-005 | Cấu hình Redis 7.0 cho caching | `DevOps` | Cycle 1 | 🟡 Medium | 29/12 | 29/12 | ⬜ Backlog |
| INFRA-006 | Setup Elasticsearch cho search | `DevOps` | Cycle 1 | 🟡 Medium | 29/12 | 30/12 | ⬜ Backlog |
| INFRA-007 | Tạo CI/CD pipeline cơ bản (GitHub Actions) | `DevOps` | Cycle 1 | 🟡 Medium | 03/01 | 05/01 | ⬜ Backlog |
| INFRA-008 | Setup production server | `DevOps` | Cycle 5 | 🔴 High | 06/02 | 06/02 | ⬜ Backlog |
| INFRA-009 | Cấu hình SSL Certificate | `DevOps` | Cycle 5 | 🔴 High | 06/02 | 06/02 | ⬜ Backlog |
| INFRA-010 | Setup CDN cho static files | `DevOps` | Cycle 5 | 🟡 Medium | 07/02 | 07/02 | ⬜ Backlog |
| INFRA-011 | Cấu hình production database | `DevOps` `DB` | Cycle 5 | 🔴 High | 07/02 | 07/02 | ⬜ Backlog |
| INFRA-012 | Setup backup strategy | `DevOps` | Cycle 5 | 🔴 High | 07/02 | 07/02 | ⬜ Backlog |
| INFRA-013 | Deploy Backend to production | `DevOps` | Cycle 5 | 🔴 High | 08/02 | 08/02 | ⬜ Backlog |
| INFRA-014 | Deploy Frontend to production | `DevOps` | Cycle 5 | 🔴 High | 08/02 | 08/02 | ⬜ Backlog |
| INFRA-015 | Setup monitoring (Sentry, logs) | `DevOps` | Cycle 5 | 🔴 High | 08/02 | 08/02 | ⬜ Backlog |
| INFRA-016 | DNS configuration & Go-live | `DevOps` | Cycle 5 | 🔴 High | 09/02 | 09/02 | ⬜ Backlog |
| INFRA-017 | Post-launch monitoring | `DevOps` | Cycle 5 | 🔴 High | 09/02 | 09/02 | ⬜ Backlog |
| INFRA-018 | Cấu hình robots.txt | `DevOps` | Cycle 5 | 🔴 High | 03/02 | 03/02 | ⬜ Backlog |

---

## Module: Authentication & User Management

> Đăng ký, đăng nhập, quản lý tài khoản, duyệt giấy phép

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| AUTH-001 | Custom User model với trạng thái duyệt | `BE` `DB` | Cycle 2 | 🔴 High | 06/01 | 06/01 | ⬜ Backlog |
| AUTH-002 | API Đăng ký (với upload giấy phép) | `BE` `API` | Cycle 2 | 🔴 High | 06/01 | 07/01 | ⬜ Backlog |
| AUTH-003 | API Đăng nhập (JWT Token) | `BE` `API` | Cycle 2 | 🔴 High | 07/01 | 07/01 | ⬜ Backlog |
| AUTH-004 | API Refresh Token | `BE` `API` | Cycle 2 | 🔴 High | 07/01 | 08/01 | ⬜ Backlog |
| AUTH-005 | API Quên mật khẩu / Reset password | `BE` `API` | Cycle 2 | 🟡 Medium | 08/01 | 08/01 | ⬜ Backlog |
| AUTH-006 | API Đổi mật khẩu | `BE` `API` | Cycle 2 | 🟡 Medium | 08/01 | 09/01 | ⬜ Backlog |
| AUTH-007 | API Profile (get/update) | `BE` `API` | Cycle 2 | 🔴 High | 09/01 | 09/01 | ⬜ Backlog |
| AUTH-008 | API Upload giấy phép | `BE` `API` | Cycle 2 | 🔴 High | 09/01 | 10/01 | ⬜ Backlog |
| AUTH-009 | API Quản lý địa chỉ (CRUD) | `BE` `API` | Cycle 2 | 🔴 High | 10/01 | 10/01 | ⬜ Backlog |
| AUTH-010 | Permission classes (IsApproved, IsAdmin) | `BE` | Cycle 2 | 🔴 High | 10/01 | 11/01 | ⬜ Backlog |
| AUTH-011 | Email service (verification, notification) | `BE` | Cycle 2 | 🟡 Medium | 11/01 | 11/01 | ⬜ Backlog |
| AUTH-012 | SMS service cho OTP (optional) | `BE` | Cycle 2 | 🟢 Low | 11/01 | 12/01 | ⬜ Backlog |
| AUTH-013 | Trang Đăng ký (với upload file) | `FE` | Cycle 3 | 🔴 High | 16/01 | 16/01 | ⬜ Backlog |
| AUTH-014 | Trang Đăng nhập | `FE` | Cycle 3 | 🔴 High | 16/01 | 16/01 | ⬜ Backlog |
| AUTH-015 | Trang Quên mật khẩu | `FE` | Cycle 3 | 🟡 Medium | 17/01 | 17/01 | ⬜ Backlog |
| AUTH-016 | Trang Profile / Thông tin cá nhân | `FE` | Cycle 3 | 🔴 High | 17/01 | 17/01 | ⬜ Backlog |
| AUTH-017 | Component Upload giấy phép | `FE` | Cycle 3 | 🔴 High | 17/01 | 18/01 | ⬜ Backlog |
| AUTH-018 | Trang Quản lý địa chỉ | `FE` | Cycle 3 | 🔴 High | 18/01 | 18/01 | ⬜ Backlog |
| AUTH-019 | Hiển thị trạng thái tài khoản (chờ duyệt/đã duyệt/từ chối) | `FE` | Cycle 3 | 🔴 High | 18/01 | 19/01 | ⬜ Backlog |
| AUTH-020 | Auth context & protected routes | `FE` | Cycle 3 | 🔴 High | 19/01 | 19/01 | ⬜ Backlog |

---

## Module: Product Management

> Sản phẩm, danh mục, tìm kiếm, wishlist

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| PROD-001 | Model Product, Category, Brand | `BE` `DB` | Cycle 2 | 🔴 High | 06/01 | 06/01 | ⬜ Backlog |
| PROD-002 | API Danh sách sản phẩm (public) | `BE` `API` | Cycle 2 | 🔴 High | 06/01 | 07/01 | ⬜ Backlog |
| PROD-003 | API Chi tiết sản phẩm (public) | `BE` `API` | Cycle 2 | 🔴 High | 07/01 | 07/01 | ⬜ Backlog |
| PROD-004 | API Danh mục sản phẩm | `BE` `API` | Cycle 2 | 🔴 High | 07/01 | 08/01 | ⬜ Backlog |
| PROD-005 | API Tìm kiếm sản phẩm (Elasticsearch) | `BE` `API` | Cycle 2 | 🔴 High | 08/01 | 09/01 | ⬜ Backlog |
| PROD-006 | API Lọc & sắp xếp sản phẩm | `BE` `API` | Cycle 2 | 🔴 High | 09/01 | 10/01 | ⬜ Backlog |
| PROD-007 | API Sản phẩm liên quan | `BE` `API` | Cycle 2 | 🟡 Medium | 10/01 | 11/01 | ⬜ Backlog |
| PROD-008 | Model Wishlist | `BE` `DB` | Cycle 2 | 🟡 Medium | 11/01 | 12/01 | ⬜ Backlog |
| PROD-009 | API Wishlist (CRUD) | `BE` `API` | Cycle 2 | 🟡 Medium | 12/01 | 12/01 | ⬜ Backlog |
| PROD-010 | Index Elasticsearch cho Products | `BE` | Cycle 2 | 🔴 High | 12/01 | 13/01 | ⬜ Backlog |
| PROD-011 | Trang chủ - Banner & danh mục | `FE` | Cycle 3 | 🔴 High | 16/01 | 16/01 | ⬜ Backlog |
| PROD-012 | Component Product Card | `FE` | Cycle 3 | 🔴 High | 16/01 | 17/01 | ⬜ Backlog |
| PROD-013 | Trang danh sách sản phẩm (grid/list view) | `FE` | Cycle 3 | 🔴 High | 17/01 | 18/01 | ⬜ Backlog |
| PROD-014 | Trang chi tiết sản phẩm | `FE` | Cycle 3 | 🔴 High | 18/01 | 19/01 | ⬜ Backlog |
| PROD-015 | Component Image Zoom | `FE` | Cycle 3 | 🟡 Medium | 19/01 | 19/01 | ⬜ Backlog |
| PROD-016 | Component Tìm kiếm (với autocomplete) | `FE` | Cycle 3 | 🔴 High | 19/01 | 20/01 | ⬜ Backlog |
| PROD-017 | Sidebar danh mục & bộ lọc | `FE` | Cycle 3 | 🔴 High | 20/01 | 20/01 | ⬜ Backlog |
| PROD-018 | Component sắp xếp sản phẩm | `FE` | Cycle 3 | 🟡 Medium | 20/01 | 21/01 | ⬜ Backlog |
| PROD-019 | Sản phẩm liên quan | `FE` | Cycle 3 | 🟡 Medium | 21/01 | 21/01 | ⬜ Backlog |
| PROD-020 | Trang Wishlist | `FE` | Cycle 3 | 🟡 Medium | 21/01 | 21/01 | ⬜ Backlog |
| PROD-021 | Pagination component | `FE` | Cycle 3 | 🔴 High | 21/01 | 22/01 | ⬜ Backlog |
| PROD-022 | Breadcrumb component | `FE` | Cycle 3 | 🟡 Medium | 22/01 | 22/01 | ⬜ Backlog |

---

## Module: Cart & Checkout

> Giỏ hàng, thanh toán

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| CART-001 | Model Cart, CartItem | `BE` `DB` | Cycle 2 | 🔴 High | 12/01 | 12/01 | ⬜ Backlog |
| CART-002 | API Giỏ hàng (get/add/update/delete) | `BE` `API` | Cycle 2 | 🔴 High | 12/01 | 13/01 | ⬜ Backlog |
| CART-003 | API Xóa toàn bộ giỏ hàng | `BE` `API` | Cycle 2 | 🟡 Medium | 13/01 | 13/01 | ⬜ Backlog |
| CART-004 | Model Coupon/Discount | `BE` `DB` | Cycle 2 | 🟡 Medium | 14/01 | 15/01 | ⬜ Backlog |
| CART-005 | API Áp dụng mã giảm giá | `BE` `API` | Cycle 2 | 🟡 Medium | 15/01 | 15/01 | ⬜ Backlog |
| CART-006 | Header Cart Icon (với badge số lượng) | `FE` | Cycle 3 | 🔴 High | 22/01 | 22/01 | ⬜ Backlog |
| CART-007 | Trang Giỏ hàng | `FE` | Cycle 3 | 🔴 High | 22/01 | 23/01 | ⬜ Backlog |
| CART-008 | Component điều chỉnh số lượng (+/-) | `FE` | Cycle 3 | 🔴 High | 23/01 | 23/01 | ⬜ Backlog |
| CART-009 | Trang Checkout (thông tin giao hàng) | `FE` | Cycle 3 | 🔴 High | 23/01 | 24/01 | ⬜ Backlog |
| CART-010 | Component chọn địa chỉ đã lưu | `FE` | Cycle 3 | 🔴 High | 24/01 | 24/01 | ⬜ Backlog |
| CART-011 | Component nhập mã giảm giá | `FE` | Cycle 3 | 🟡 Medium | 24/01 | 24/01 | ⬜ Backlog |

---

## Module: Order Management

> Quản lý đơn hàng

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| ORDER-001 | Model Order, OrderItem | `BE` `DB` | Cycle 2 | 🔴 High | 13/01 | 13/01 | ⬜ Backlog |
| ORDER-002 | API Tạo đơn hàng | `BE` `API` | Cycle 2 | 🔴 High | 13/01 | 14/01 | ⬜ Backlog |
| ORDER-003 | API Danh sách đơn hàng (user) | `BE` `API` | Cycle 2 | 🔴 High | 14/01 | 14/01 | ⬜ Backlog |
| ORDER-004 | API Chi tiết đơn hàng | `BE` `API` | Cycle 2 | 🔴 High | 14/01 | 14/01 | ⬜ Backlog |
| ORDER-005 | API Hủy đơn hàng | `BE` `API` | Cycle 2 | 🔴 High | 14/01 | 15/01 | ⬜ Backlog |
| ORDER-006 | API Mua lại đơn hàng | `BE` `API` | Cycle 2 | 🟡 Medium | 15/01 | 15/01 | ⬜ Backlog |
| ORDER-007 | Trang Theo dõi đơn hàng | `FE` | Cycle 3 | 🔴 High | 24/01 | 25/01 | ⬜ Backlog |
| ORDER-008 | Trang Chi tiết đơn hàng | `FE` | Cycle 3 | 🔴 High | 25/01 | 25/01 | ⬜ Backlog |
| ORDER-009 | Component Order Status Timeline | `FE` | Cycle 3 | 🟡 Medium | 25/01 | 25/01 | ⬜ Backlog |

---

## Module: Payment Integration

> Tích hợp thanh toán VNPay, MoMo, ZaloPay, COD

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| PAY-001 | COD payment method | `BE` `API` | Cycle 4 | 🔴 High | 26/01 | 26/01 | ⬜ Backlog |
| PAY-002 | Tích hợp VNPay | `BE` `API` | Cycle 4 | 🔴 High | 26/01 | 26/01 | ⬜ Backlog |
| PAY-003 | VNPay Webhook handler | `BE` | Cycle 4 | 🔴 High | 26/01 | 27/01 | ⬜ Backlog |
| PAY-004 | Tích hợp MoMo | `BE` `API` | Cycle 4 | 🔴 High | 27/01 | 27/01 | ⬜ Backlog |
| PAY-005 | MoMo Webhook handler | `BE` | Cycle 4 | 🔴 High | 27/01 | 28/01 | ⬜ Backlog |
| PAY-006 | Tích hợp ZaloPay | `BE` `API` | Cycle 4 | 🟡 Medium | 28/01 | 28/01 | ⬜ Backlog |
| PAY-007 | ZaloPay Webhook handler | `BE` | Cycle 4 | 🟡 Medium | 28/01 | 29/01 | ⬜ Backlog |
| PAY-008 | UI Chọn phương thức thanh toán | `FE` | Cycle 4 | 🔴 High | 29/01 | 29/01 | ⬜ Backlog |
| PAY-009 | Trang thanh toán thành công/thất bại | `FE` | Cycle 4 | 🔴 High | 29/01 | 30/01 | ⬜ Backlog |
| PAY-010 | Redirect flow VNPay/MoMo | `FE` | Cycle 4 | 🔴 High | 30/01 | 30/01 | ⬜ Backlog |

---

## Module: Chat & Support

> Chat realtime, hỗ trợ khách hàng

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| CHAT-001 | Setup Django Channels (WebSocket) | `BE` | Cycle 4 | 🔴 High | 26/01 | 26/01 | ⬜ Backlog |
| CHAT-002 | Model Conversation, Message | `BE` `DB` | Cycle 4 | 🔴 High | 26/01 | 27/01 | ⬜ Backlog |
| CHAT-003 | WebSocket consumer cho chat | `BE` | Cycle 4 | 🔴 High | 27/01 | 28/01 | ⬜ Backlog |
| CHAT-004 | API Danh sách conversations | `BE` `API` | Cycle 4 | 🔴 High | 28/01 | 28/01 | ⬜ Backlog |
| CHAT-005 | API Lịch sử tin nhắn | `BE` `API` | Cycle 4 | 🔴 High | 28/01 | 29/01 | ⬜ Backlog |
| CHAT-006 | API Upload hình ảnh trong chat | `BE` `API` | Cycle 4 | 🟡 Medium | 29/01 | 29/01 | ⬜ Backlog |
| CHAT-007 | Auto welcome message | `BE` | Cycle 4 | 🟡 Medium | 29/01 | 30/01 | ⬜ Backlog |
| CHAT-008 | Chat icon với badge notification | `FE` | Cycle 4 | 🔴 High | 30/01 | 30/01 | ⬜ Backlog |
| CHAT-009 | Chat sidebar (danh sách conversations) | `FE` | Cycle 4 | 🔴 High | 30/01 | 31/01 | ⬜ Backlog |
| CHAT-010 | Chat window (messages) | `FE` | Cycle 4 | 🔴 High | 31/01 | 31/01 | ⬜ Backlog |
| CHAT-011 | WebSocket connection (client) | `FE` | Cycle 4 | 🔴 High | 31/01 | 01/02 | ⬜ Backlog |
| CHAT-012 | Upload hình ảnh trong chat | `FE` | Cycle 4 | 🟡 Medium | 01/02 | 01/02 | ⬜ Backlog |

---

## Module: Content Management (CMS)

> Trang giới thiệu, tin tức, header/footer

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| CMS-001 | Header với thông tin liên hệ | `FE` | Cycle 1 | 🔴 High | 03/01 | 04/01 | ⬜ Backlog |
| CMS-002 | Footer với links & SEO | `FE` | Cycle 1 | 🔴 High | 04/01 | 05/01 | ⬜ Backlog |
| CMS-003 | Trang Giới thiệu công ty | `FE` | Cycle 3 | 🟡 Medium | 23/01 | 23/01 | ⬜ Backlog |
| CMS-004 | Trang Liên hệ (với form) | `FE` | Cycle 3 | 🟡 Medium | 23/01 | 23/01 | ⬜ Backlog |
| CMS-005 | Trang Tin tức/Sự kiện | `FE` | Cycle 3 | 🟢 Low | 24/01 | 25/01 | ⬜ Backlog |

---

## Module: Admin Panel

> Quản trị viên: duyệt tài khoản, quản lý sản phẩm, đơn hàng

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| ADMIN-001 | Admin authentication & layout | `FE` | Cycle 4 | 🔴 High | 26/01 | 26/01 | ⬜ Backlog |
| ADMIN-002 | Dashboard tổng quan | `FE` `BE` `API` | Cycle 4 | 🔴 High | 26/01 | 27/01 | ⬜ Backlog |
| ADMIN-003 | API Danh sách tài khoản chờ duyệt | `BE` `API` | Cycle 4 | 🔴 High | 27/01 | 27/01 | ⬜ Backlog |
| ADMIN-004 | API Duyệt/Từ chối tài khoản | `BE` `API` | Cycle 4 | 🔴 High | 27/01 | 28/01 | ⬜ Backlog |
| ADMIN-005 | UI Quản lý tài khoản (danh sách, lọc, tìm kiếm) | `FE` | Cycle 4 | 🔴 High | 28/01 | 28/01 | ⬜ Backlog |
| ADMIN-006 | UI Chi tiết tài khoản (xem giấy phép) | `FE` | Cycle 4 | 🔴 High | 28/01 | 29/01 | ⬜ Backlog |
| ADMIN-007 | UI Duyệt/Từ chối với lý do | `FE` | Cycle 4 | 🔴 High | 29/01 | 29/01 | ⬜ Backlog |
| ADMIN-008 | API CRUD Products (admin) | `BE` `API` | Cycle 4 | 🔴 High | 29/01 | 30/01 | ⬜ Backlog |
| ADMIN-009 | UI Quản lý sản phẩm | `FE` | Cycle 4 | 🔴 High | 30/01 | 30/01 | ⬜ Backlog |
| ADMIN-010 | UI Thêm/Sửa sản phẩm (với upload ảnh) | `FE` | Cycle 4 | 🔴 High | 30/01 | 31/01 | ⬜ Backlog |
| ADMIN-011 | API CRUD Categories (admin) | `BE` `API` | Cycle 4 | 🔴 High | 31/01 | 31/01 | ⬜ Backlog |
| ADMIN-012 | UI Quản lý danh mục | `FE` | Cycle 4 | 🟡 Medium | 31/01 | 31/01 | ⬜ Backlog |
| ADMIN-013 | API Quản lý đơn hàng (admin) | `BE` `API` | Cycle 4 | 🔴 High | 31/01 | 01/02 | ⬜ Backlog |
| ADMIN-014 | UI Quản lý đơn hàng | `FE` | Cycle 4 | 🔴 High | 01/02 | 01/02 | ⬜ Backlog |
| ADMIN-015 | UI Cập nhật trạng thái đơn hàng | `FE` | Cycle 4 | 🔴 High | 01/02 | 01/02 | ⬜ Backlog |
| ADMIN-016 | UI Quản lý chat (trả lời khách hàng) | `FE` | Cycle 4 | 🔴 High | 01/02 | 02/02 | ⬜ Backlog |
| ADMIN-017 | API Thống kê doanh số | `BE` `API` | Cycle 4 | 🟡 Medium | 02/02 | 02/02 | ⬜ Backlog |
| ADMIN-018 | UI Báo cáo & thống kê | `FE` | Cycle 4 | 🟡 Medium | 02/02 | 02/02 | ⬜ Backlog |

---

## Module: Backend Foundation

> Setup Django, DRF, Celery, Logging

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| BE-001 | Khởi tạo Django 6.0 project structure | `BE` | Cycle 1 | 🔴 High | 27/12 | 28/12 | ⬜ Backlog |
| BE-002 | Cấu hình Django settings (dev/staging/prod) | `BE` | Cycle 1 | 🔴 High | 28/12 | 29/12 | ⬜ Backlog |
| BE-003 | Setup Django REST Framework | `BE` `API` | Cycle 1 | 🔴 High | 29/12 | 29/12 | ⬜ Backlog |
| BE-004 | Thiết kế Database Schema (ERD) | `BE` `DB` | Cycle 1 | 🔴 High | 29/12 | 30/12 | ⬜ Backlog |
| BE-005 | Tạo base models (User, Product, Order, etc.) | `BE` `DB` | Cycle 1 | 🔴 High | 30/12 | 31/12 | ⬜ Backlog |
| BE-006 | Setup Celery cho async tasks | `BE` | Cycle 1 | 🟡 Medium | 01/01 | 02/01 | ⬜ Backlog |
| BE-007 | Cấu hình logging & error handling | `BE` | Cycle 1 | 🟡 Medium | 02/01 | 03/01 | ⬜ Backlog |
| BE-008 | Setup API documentation (Swagger/OpenAPI) | `BE` `API` | Cycle 1 | 🟡 Medium | 03/01 | 04/01 | ⬜ Backlog |

---

## Module: Frontend Foundation

> Setup NextJS, Tailwind, Shadcn, components cơ bản

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| FE-001 | Khởi tạo NextJS 16.1 project | `FE` | Cycle 1 | 🔴 High | 27/12 | 28/12 | ⬜ Backlog |
| FE-002 | Setup Tailwind CSS + Shadcn/UI | `FE` | Cycle 1 | 🔴 High | 28/12 | 29/12 | ⬜ Backlog |
| FE-003 | Cấu hình project structure (app router) | `FE` | Cycle 1 | 🔴 High | 29/12 | 30/12 | ⬜ Backlog |
| FE-004 | Setup state management (Zustand/Redux) | `FE` | Cycle 1 | 🟡 Medium | 30/12 | 31/12 | ⬜ Backlog |
| FE-005 | Cấu hình API client (Axios/React Query) | `FE` `API` | Cycle 1 | 🔴 High | 31/12 | 01/01 | ⬜ Backlog |
| FE-006 | Tạo base components (Button, Input, Modal, etc.) | `FE` | Cycle 1 | 🔴 High | 01/01 | 02/01 | ⬜ Backlog |
| FE-007 | Setup MagicUI components | `FE` | Cycle 1 | 🟡 Medium | 02/01 | 03/01 | ⬜ Backlog |
| FE-008 | Thiết kế Layout cơ bản (Header, Footer, Sidebar) | `FE` | Cycle 1 | 🔴 High | 03/01 | 04/01 | ⬜ Backlog |

---

## Module: SEO & Marketing

> Meta tags, sitemap, analytics

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| SEO-001 | Meta tags cho tất cả trang | `FE` | Cycle 5 | 🔴 High | 03/02 | 03/02 | ⬜ Backlog |
| SEO-002 | Tạo sitemap.xml | `BE` | Cycle 5 | 🔴 High | 03/02 | 03/02 | ⬜ Backlog |
| SEO-003 | Schema markup (Product, Organization) | `FE` | Cycle 5 | 🟡 Medium | 03/02 | 04/02 | ⬜ Backlog |
| SEO-004 | Tích hợp Google Analytics 4 | `FE` | Cycle 5 | 🔴 High | 04/02 | 04/02 | ⬜ Backlog |
| SEO-005 | Image optimization (WebP, lazy load) | `FE` | Cycle 5 | 🟡 Medium | 04/02 | 04/02 | ⬜ Backlog |
| SEO-006 | Lighthouse audit & optimization | `FE` `DevOps` | Cycle 5 | 🟡 Medium | 04/02 | 05/02 | ⬜ Backlog |

---

## Module: Testing & QA

> Unit tests, integration tests, UAT

| ID | Work Item | Labels | Cycle | Priority | Start | Due | Status |
|----|-----------|--------|-------|----------|-------|-----|--------|
| TEST-001 | Unit tests cho Auth APIs | `BE` | Cycle 5 | 🔴 High | 03/02 | 03/02 | ⬜ Backlog |
| TEST-002 | Unit tests cho Product APIs | `BE` | Cycle 5 | 🔴 High | 03/02 | 03/02 | ⬜ Backlog |
| TEST-003 | Unit tests cho Order APIs | `BE` | Cycle 5 | 🔴 High | 03/02 | 04/02 | ⬜ Backlog |
| TEST-004 | Integration tests Payment | `BE` | Cycle 5 | 🔴 High | 04/02 | 04/02 | ⬜ Backlog |
| TEST-005 | E2E tests cho user flow chính | `FE` | Cycle 5 | 🟡 Medium | 04/02 | 05/02 | ⬜ Backlog |
| TEST-006 | Performance testing | `DevOps` | Cycle 5 | 🟡 Medium | 05/02 | 05/02 | ⬜ Backlog |
| TEST-007 | Security audit (OWASP) | `DevOps` | Cycle 5 | 🔴 High | 05/02 | 05/02 | ⬜ Backlog |
| TEST-008 | UAT với khách hàng | `-` | Cycle 5 | 🔴 High | 05/02 | 06/02 | ⬜ Backlog |
| TEST-009 | Bug fixes từ UAT | `BE` `FE` | Cycle 5 | 🔴 High | 06/02 | 07/02 | ⬜ Backlog |

---

# 🔄 CYCLES OVERVIEW

## Cycle 1: Setup & Foundation (27/12 - 05/01)

| Module | Work Items |
|--------|------------|
| Infrastructure & DevOps | INFRA-001 → INFRA-007 |
| Backend Foundation | BE-001 → BE-008 |
| Frontend Foundation | FE-001 → FE-008 |
| Content Management | CMS-001, CMS-002 |

**Total:** 25 work items

---

## Cycle 2: Core Backend & Auth (06/01 - 15/01)

| Module | Work Items |
|--------|------------|
| Authentication | AUTH-001 → AUTH-012 |
| Product Management | PROD-001 → PROD-010 |
| Cart & Checkout | CART-001 → CART-005 |
| Order Management | ORDER-001 → ORDER-006 |

**Total:** 33 work items

---

## Cycle 3: Core Frontend (16/01 - 25/01)

| Module | Work Items |
|--------|------------|
| Authentication | AUTH-013 → AUTH-020 |
| Product Management | PROD-011 → PROD-022 |
| Cart & Checkout | CART-006 → CART-011 |
| Order Management | ORDER-007 → ORDER-009 |
| Content Management | CMS-003 → CMS-005 |

**Total:** 32 work items

---

## Cycle 4: Advanced Features (26/01 - 02/02)

| Module | Work Items |
|--------|------------|
| Payment Integration | PAY-001 → PAY-010 |
| Chat & Support | CHAT-001 → CHAT-012 |
| Admin Panel | ADMIN-001 → ADMIN-018 |

**Total:** 40 work items

---

## Cycle 5: Testing & Launch (03/02 - 09/02)

| Module | Work Items |
|--------|------------|
| SEO & Marketing | SEO-001 → SEO-006 |
| Testing & QA | TEST-001 → TEST-009 |
| Infrastructure & DevOps | INFRA-008 → INFRA-018 |

**Total:** 26 work items

---

# 📊 THỐNG KÊ TỔNG QUAN

## Theo Label

| Label | Số lượng | Tỷ lệ |
|-------|----------|-------|
| `BE` | 58 | 37% |
| `FE` | 68 | 44% |
| `DevOps` | 18 | 12% |
| `API` | 45 | 29% |
| `DB` | 15 | 10% |

> *Lưu ý: 1 work item có thể có nhiều labels*

## Theo Priority

| Priority | Số lượng | Tỷ lệ |
|----------|----------|-------|
| 🔴 High | 115 | 74% |
| 🟡 Medium | 37 | 24% |
| 🟢 Low | 4 | 2% |

## Theo Module

| Module | Số Work Items |
|--------|---------------|
| Infrastructure & DevOps | 18 |
| Authentication & User Management | 20 |
| Product Management | 22 |
| Cart & Checkout | 11 |
| Order Management | 9 |
| Payment Integration | 10 |
| Chat & Support | 12 |
| Content Management | 5 |
| Admin Panel | 18 |
| Backend Foundation | 8 |
| Frontend Foundation | 8 |
| SEO & Marketing | 6 |
| Testing & QA | 9 |
| **TỔNG** | **156** |

---

# 🎯 MILESTONES

| Milestone | Ngày | Deliverables |
|-----------|------|--------------|
| **M1** | 05/01/2026 | ✅ Dev environment ready, project structure |
| **M2** | 15/01/2026 | ✅ Core APIs completed (Auth, Products, Orders) |
| **M3** | 25/01/2026 | ✅ Core Frontend completed, API integrated |
| **M4** | 02/02/2026 | ✅ Payment, Chat, Admin Panel ready |
| **M5** | 09/02/2026 | 🚀 **GO-LIVE** |

---

*Tài liệu được tạo dựa trên [feature.md](feature.md) và [information.md](information.md)*
