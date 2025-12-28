erDiagram
    %% =============================================
    %% WEBSITE BÁN DƯỢC PHẨM - DATABASE SCHEMA
    %% =============================================

    %% Relationships
    USERS ||--o{ ORDERS : places
    USERS ||--o{ ADDRESSES : has
    USERS ||--o{ FAVORITES : has
    USERS ||--o{ CONVERSATIONS : participates
    USERS ||--o{ MESSAGES : sends
    
    MANUFACTURERS ||--o{ PRODUCTS : produces
    CATEGORIES ||--o{ PRODUCTS : contains
    
    PRODUCTS ||--o{ ORDER_ITEMS : included_in
    PRODUCTS ||--o{ FAVORITES : saved_in
    PRODUCTS ||--o{ PRODUCT_IMAGES : has
    
    ORDERS ||--o{ ORDER_ITEMS : contains
    ORDERS }o--|| COUPONS : uses
    ORDERS }o--|| ADDRESSES : ships_to
    
    CONVERSATIONS ||--o{ MESSAGES : contains

    %% =============================================
    %% USER MANAGEMENT
    %% =============================================

    USERS {
        uuid id PK
        string email UK "Unique"
        string phone UK "Unique"
        string password_hash
        string full_name
        string avatar_url
        date date_of_birth
        enum gender "MALE, FEMALE, OTHER"
        enum role "ADMIN, CUSTOMER"
        enum status "PENDING, ACTIVE, REJECTED, LOCKED"
        string license_file_url "Giấy phép kinh doanh"
        string rejection_reason "Lý do từ chối"
        uuid approved_by FK "Admin duyệt"
        timestamp approved_at "Thời điểm duyệt"
        timestamp created_at
        timestamp updated_at
    }

    ADDRESSES {
        uuid id PK
        uuid user_id FK
        string recipient_name "Tên người nhận"
        string phone
        string address_line "Địa chỉ chi tiết"
        string province "Tỉnh/Thành phố"
        string district "Quận/Huyện"
        string ward "Phường/Xã"
        boolean is_default
        timestamp created_at
        timestamp updated_at
    }

    %% =============================================
    %% PRODUCT MANAGEMENT
    %% =============================================

    CATEGORIES {
        uuid id PK
        string name
        string slug UK
        string description
        string image_url
        int sort_order
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    MANUFACTURERS {
        uuid id PK
        string name "KHAPHARCO, TIPHARCO, etc."
        string slug UK
        string logo_url
        string description
        string website
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    PRODUCTS {
        uuid id PK
        string name
        string slug UK
        string sku "Mã sản phẩm"
        decimal price "Giá bán"
        decimal original_price "Giá gốc (nếu khuyến mãi)"
        int stock_quantity "Số lượng tồn kho"
        string unit "Đơn vị: hộp, vỉ, chai..."
        string active_ingredient "Hoạt chất"
        string packaging "Quy cách đóng gói"
        text description "Mô tả chi tiết"
        text usage_instructions "Hướng dẫn sử dụng"
        text storage_instructions "Bảo quản"
        string thumbnail_url "Ảnh đại diện"
        boolean is_active
        boolean is_featured "Sản phẩm nổi bật"
        int sold_count "Số lượng đã bán"
        int view_count "Lượt xem"
        uuid category_id FK
        uuid manufacturer_id FK
        timestamp created_at
        timestamp updated_at
    }

    PRODUCT_IMAGES {
        uuid id PK
        uuid product_id FK
        string image_url
        int sort_order
        timestamp created_at
    }

    FAVORITES {
        uuid id PK
        uuid user_id FK
        uuid product_id FK
        timestamp created_at
    }

    %% =============================================
    %% ORDER MANAGEMENT
    %% =============================================

    ORDERS {
        uuid id PK
        string order_code UK "Mã đơn hàng: DH202312280001"
        uuid user_id FK
        uuid address_id FK "Địa chỉ giao hàng"
        uuid coupon_id FK "Mã giảm giá đã dùng"
        decimal subtotal "Tổng tiền sản phẩm"
        decimal discount_amount "Số tiền giảm"
        decimal shipping_fee "Phí vận chuyển"
        decimal total_amount "Tổng thanh toán"
        enum delivery_method "HOME_DELIVERY, STORE_PICKUP"
        string recipient_name "Tên người nhận"
        string recipient_phone "SĐT người nhận"
        string shipping_address "Địa chỉ giao hàng đầy đủ"
        enum status "PENDING, CONFIRMED, PROCESSING, SHIPPING, COMPLETED, CANCELLED"
        enum payment_method "COD, MOMO, ZALOPAY, VNPAY, BANKING"
        enum payment_status "PENDING, PAID, FAILED, REFUNDED"
        timestamp paid_at "Thời điểm thanh toán"
        text note "Ghi chú đơn hàng"
        string cancel_reason "Lý do hủy"
        timestamp created_at
        timestamp updated_at
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        string product_name "Lưu tên SP tại thời điểm mua"
        string product_thumbnail "Lưu ảnh SP"
        int quantity
        decimal unit_price "Đơn giá tại thời điểm mua"
        decimal total_price "Thành tiền"
        string note "Ghi chú sản phẩm"
    }

    %% =============================================
    %% COUPON / DISCOUNT
    %% =============================================

    COUPONS {
        uuid id PK
        string code UK "Mã giảm giá"
        string name "Tên chương trình"
        text description
        enum type "PERCENT, FIXED_AMOUNT"
        decimal value "Giá trị (% hoặc số tiền)"
        decimal max_discount "Giảm tối đa (nếu %)"
        decimal min_order_amount "Đơn hàng tối thiểu"
        int usage_limit "Giới hạn sử dụng"
        int used_count "Đã sử dụng"
        timestamp valid_from
        timestamp valid_to
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    %% =============================================
    %% CHAT / MESSAGING
    %% =============================================

    CONVERSATIONS {
        uuid id PK
        uuid customer_id FK "Khách hàng"
        uuid admin_id FK "Admin phụ trách (nullable)"
        string title "Tiêu đề cuộc hội thoại"
        enum status "OPEN, CLOSED"
        timestamp last_message_at
        timestamp created_at
        timestamp updated_at
    }

    MESSAGES {
        uuid id PK
        uuid conversation_id FK
        uuid sender_id FK "Người gửi"
        text content "Nội dung tin nhắn"
        string image_url "Ảnh đính kèm"
        boolean is_read
        timestamp read_at
        timestamp created_at
    }

    %% =============================================
    %% CONTENT MANAGEMENT
    %% =============================================

    NEWS {
        uuid id PK
        string title
        string slug UK
        text summary "Tóm tắt"
        text content "Nội dung HTML"
        string thumbnail_url
        enum type "NEWS, EVENT, PROMOTION"
        boolean is_published
        int view_count
        uuid author_id FK
        timestamp published_at
        timestamp created_at
        timestamp updated_at
    }

    BANNERS {
        uuid id PK
        string title
        string image_url
        string link_url "Link khi click"
        enum position "HOME_HERO, HOME_SIDEBAR, CATEGORY"
        int sort_order
        boolean is_active
        timestamp start_date
        timestamp end_date
        timestamp created_at
        timestamp updated_at
    }

    COMPANY_INFO {
        uuid id PK
        string key UK "about_us, vision, mission, history..."
        text value_vi "Nội dung tiếng Việt"
        text value_en "Nội dung tiếng Anh (optional)"
        timestamp updated_at
    }

    CONTACTS {
        uuid id PK
        string name
        string email
        string phone
        string subject
        text message
        enum status "NEW, READ, REPLIED"
        timestamp created_at
    }

    %% =============================================
    %% SYSTEM
    %% =============================================

    SETTINGS {
        uuid id PK
        string key UK "site_name, hotline, email, address..."
        text value
        string description
        timestamp updated_at
    }

    AUDIT_LOGS {
        uuid id PK
        uuid user_id FK
        string action "CREATE, UPDATE, DELETE, APPROVE, REJECT"
        string entity_type "USER, ORDER, PRODUCT..."
        uuid entity_id
        jsonb old_value "Giá trị cũ"
        jsonb new_value "Giá trị mới"
        string ip_address
        timestamp created_at
    }