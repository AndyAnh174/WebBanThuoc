| Version | Date       | Nội dung                                                                                                                                                                   |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v0.1    | 26/12/2025 | Khởi tạo mô tả chức năng như yêu cầu của khách hàng, <https://danhmuchang.buynow.vn/home>                                                                                  |
| v0.2    | 27/12/2025 | Cập nhật thêm yêu cầu xác thực doanh nghiệp khi đăng ký tài khoản, chỉ đăng ký mới được mua hàng, tham khảo: [dozen.vn](http://dozen.vn), [thuocsi.vn](http://thuocsi.vn). |

**URL hiện tại (tạm thời):** <https://danhmuchang.buynow.vn/home>

**Mô tả tổng quan:** Trang web bán dược phẩm trực tuyến chuyên doanh các sản phẩm từ các nhà sản xuất: KHAPHARCO, TIPHARCO, PYMEPHARCO, VACOPHARMA, AGIMEXPHARM, USP, NIC, MEDISUN, CETECO, VIDIPHA, MEKOPHAR.

## CÔNG NGHỆ SỬ DỤNG

* **Backend:** Django 6.0

* **Database:** PostgreSQL 16

* **File Storage:** MinIO

* **Cache Storage:** Redis 7.0

* **Frontend:** NextJS 16.1.* Shacdn/MagicUI

* **Search Engine:** Elasticsearch

## YÊU CẦU CỦA KHÁCH HÀNG

### Tình trạng hiện tại

* Khách hàng đang sử dụng website tạm thời từ nền tảng **sobanhang** ([buynow.vn](http://buynow.vn))

* Cần xây dựng website riêng, chuyên nghiệp và độc lập

### Yêu cầu chức năng

#### 1. Website Bán Hàng (E-commerce)

* **Xem sản phẩm công khai:** Khách hàng có thể xem danh sách và chi tiết sản phẩm mà không cần đăng nhập

* **Yêu cầu đăng nhập để đặt hàng:** Chỉ khi đặt hàng (thêm vào giỏ, thanh toán) mới yêu cầu đăng nhập và tài khoản đã được duyệt

* **Đăng ký với giấy phép:** Khách hàng phải cung cấp giấy phép khi đăng ký để chứng minh đủ điều kiện mua hàng

* **Hệ thống duyệt tài khoản:** Admin duyệt tài khoản sau khi kiểm tra giấy tờ hợp lệ, chỉ khách hàng đã được duyệt mới được đặt hàng

* Tính năng: Xem danh sách/chi tiết sản phẩm (công khai), tìm kiếm/lọc, giỏ hàng (yêu cầu đăng nhập), đặt hàng/thanh toán (yêu cầu đăng nhập + duyệt), theo dõi đơn hàng, quản lý tài khoản, chat/nhắn tin tư vấn

#### 2. Website Giới Thiệu Công Ty

* **Trang công khai:** Các trang giới thiệu có thể xem công khai không cần đăng nhập

* **Xem sản phẩm công khai:** Từ trang giới thiệu, khách hàng có thể xem chi tiết sản phẩm mà không cần đăng nhập

* **Yêu cầu đăng nhập:** Chỉ khi muốn đặt hàng, khách hàng mới cần đăng ký/đăng nhập

* Các trang: Trang chủ giới thiệu, Giới thiệu về công ty, Lịch sử/Tầm nhìn/Sứ mệnh, Đội ngũ, Thành tựu/Chứng nhận, Tin tức/Sự kiện, Liên hệ

* Tích hợp với website bán hàng, có liên kết rõ ràng giữa 2 phần

## CHỨC NĂNG CHI TIẾT

### 1. HEADER & NAVIGATION

**Thông tin liên hệ:**

* Hotline: 0343 210 287 (click để gọi), Giờ làm việc: 08:00-17:30, Địa chỉ: 134/1 Tô Hiến Thành, P.15, Q.10, TP.HCM, Nút "Xem bản đồ"

**Logo & Tìm kiếm:**

* Logo (click về trang chủ), Thanh tìm kiếm sản phẩm

**Menu người dùng:**

* **Chưa đăng nhập:** Icon tài khoản (đăng nhập/đăng ký), Icon yêu thích (yêu cầu đăng nhập), Giỏ hàng (hiển thị "0đ"), Icon Chat/Nhắn tin

* **Đã đăng nhập:** Avatar + tên người dùng (menu: thông tin tài khoản, đăng xuất), Yêu thích (xem/quản lý), Giỏ hàng (số lượng + tổng tiền), Theo dõi đơn hàng, Icon Chat/Nhắn tin (có thể có thông báo)

### 2. TRANG CHỦ

**Khi chưa đăng nhập:**

* **Banner & Thông tin:** Banner cửa hàng, Tiêu đề "DANH MỤC HÀNG", Mô tả các nhà sản xuất

* **Danh mục sản phẩm:** Tất cả, MEKOPHAR, KHÁNG SINH, TIPHARCO, SAVIPHARM, MEDIPHARCO, TẨY GIUN/KÍ SINH TRÙNG, AGIMEXPHARM, KHAPHARCO, GAN MẬT, KHÁNG VIÊM, VITAMIN VÀ KHOÁNG CHẤT, ...

* **Sắp xếp:** Mặc định, Mới nhất, Bán chạy, Khuyến mãi, Giá giảm/tăng dần

* **Danh sách sản phẩm:** Mỗi sản phẩm hiển thị hình ảnh, tên (link chi tiết), giá

* **Nút "Thêm vào giỏ":** Hiển thị nhưng khi click sẽ yêu cầu đăng nhập

* **Thông báo nhẹ:** Có thể hiển thị banner nhỏ "Đăng ký để được đặt hàng" hoặc tương tự

* **Footer:** Danh sách sản phẩm phổ biến, SEO links

**Khi đã đăng nhập (tài khoản đã được duyệt):**

* **Banner & Thông tin:** Banner cửa hàng, Tiêu đề "DANH MỤC HÀNG", Mô tả các nhà sản xuất

* **Danh mục sản phẩm:** Tất cả, MEKOPHAR, KHÁNG SINH, TIPHARCO, SAVIPHARM, MEDIPHARCO, TẨY GIUN/KÍ SINH TRÙNG, AGIMEXPHARM, KHAPHARCO, GAN MẬT, KHÁNG VIÊM, VITAMIN VÀ KHOÁNG CHẤT, ...

* **Sắp xếp:** Mặc định, Mới nhất, Bán chạy, Khuyến mãi, Giá giảm/tăng dần

* **Danh sách sản phẩm:** Mỗi sản phẩm hiển thị hình ảnh, tên (link chi tiết), giá, nút "Thêm vào giỏ" (hoạt động bình thường)

* **Footer:** Danh sách sản phẩm phổ biến, SEO links

**Khi đã đăng nhập (tài khoản chờ duyệt):**

* Hiển thị đầy đủ danh sách sản phẩm như khi chưa đăng nhập

* Nút "Thêm vào giỏ" hiển thị nhưng khi click sẽ thông báo: "Tài khoản của bạn đang chờ duyệt. Vui lòng đợi admin xác nhận giấy tờ."

### 3. TRANG CHI TIẾT SẢN PHẨM

**Khi chưa đăng nhập:**

* **Breadcrumb:** Trang chủ > Danh mục > Tên sản phẩm

* **Thông tin:** Hình ảnh (có thể zoom), Tên sản phẩm, Giá + đơn vị, Mô tả (hoạt chất, quy cách đóng gói) - Tất cả đều hiển thị công khai

* **Hành động:**

  * Nút "Thêm vào giỏ" hiển thị nhưng khi click sẽ yêu cầu đăng nhập

  * Nút "Mua ngay" hiển thị nhưng khi click sẽ yêu cầu đăng nhập

  * Có thể có banner nhỏ "Đăng ký để đặt hàng"

* **Sản phẩm liên quan:** Tiêu đề "Có thể bạn thích", Danh sách sản phẩm tương tự, Nút "Xem tất cả"

**Khi đã đăng nhập (tài khoản đã được duyệt):**

* **Breadcrumb:** Trang chủ > Danh mục > Tên sản phẩm

* **Thông tin:** Hình ảnh (có thể zoom), Tên sản phẩm, Giá + đơn vị, Mô tả (hoạt chất, quy cách đóng gói)

* **Hành động:** Nút "Thêm vào giỏ", Nút "Mua ngay" (hoạt động bình thường)

* **Sản phẩm liên quan:** Tiêu đề "Có thể bạn thích", Danh sách sản phẩm tương tự, Nút "Xem tất cả"

**Khi đã đăng nhập (tài khoản chờ duyệt):**

* **Breadcrumb:** Trang chủ > Danh mục > Tên sản phẩm

* **Thông tin:** Hình ảnh (có thể zoom), Tên sản phẩm, Giá + đơn vị, Mô tả (hoạt chất, quy cách đóng gói) - Hiển thị đầy đủ

* **Hành động:**

  * Nút "Thêm vào giỏ" hiển thị nhưng khi click sẽ thông báo: "Tài khoản của bạn đang chờ duyệt. Vui lòng đợi admin xác nhận giấy tờ."

  * Nút "Mua ngay" tương tự

* **Sản phẩm liên quan:** Tiêu đề "Có thể bạn thích", Danh sách sản phẩm tương tự, Nút "Xem tất cả"

### 4. GIỎ HÀNG & THANH TOÁN

**Yêu cầu:**

* Chỉ khách hàng đã đăng nhập và tài khoản đã được duyệt mới có thể thêm sản phẩm vào giỏ hàng và đặt hàng

* Khách hàng chưa đăng nhập: Khi click "Thêm vào giỏ" hoặc "Mua ngay", chuyển đến trang đăng nhập/đăng ký

* Khách hàng đã đăng nhập nhưng tài khoản chờ duyệt: Hiển thị thông báo "Tài khoản đang chờ duyệt, vui lòng đợi admin xác nhận"

**Giỏ hàng trống:**

* Thông báo "Chưa có sản phẩm trong giỏ hàng", Nút "Mua hàng ngay"

**Giỏ hàng có sản phẩm (chỉ khi tài khoản đã được duyệt):**

* **Điều hướng:** Nút "Tiếp tục mua hàng", Nút "Xóa giỏ hàng"

* **Thông tin giao hàng:**

  * Chọn phương thức: "Giao tại nhà" / "Nhận tại cửa hàng"

  * Form: Tên người nhận* (tự động điền nếu đã đăng nhập), Số điện thoại*, Địa chỉ* (chọn từ danh sách đã lưu hoặc nhập mới)

* **Danh sách sản phẩm:** Bảng với cột: Sản phẩm (hình + tên), Đơn giá, Số lượng (điều chỉnh +/-), Thành tiền, Ghi chú sản phẩm, Nút xóa

* **Gợi ý:** "Thường được mua kèm với" - danh sách sản phẩm gợi ý với nút "Thêm vào giỏ"

* **Mã giảm giá:** Nút "Thêm mã giảm"

* **Phương thức thanh toán:**

  * Hiển thị phương thức hiện tại, Nút "Thay đổi"

  * **Thanh toán khi nhận hàng (COD):** Thanh toán tiền mặt khi nhận hàng

  * **Ví điện tử:**

    * MoMo

    * ZaloPay

    * VNPay

    * ShopeePay (nếu tích hợp)

  * **Chuyển khoản ngân hàng:**

    * Chuyển khoản qua Internet Banking

    * Chuyển khoản qua ATM

    * Quét mã QR ngân hàng

  * **Thẻ tín dụng/Ghi nợ:**

    * Visa

    * Mastercard

    * JCB

    * Thẻ nội địa (Napas)

  * **Trả góp:** (Tùy chọn, nếu có chương trình trả góp)

* **Ghi chú đơn hàng:** Textarea nhập ghi chú

* **Thông tin thanh toán:** Tổng số sản phẩm + tiền, Tổng cộng (bao gồm phí vận chuyển, giảm giá), Nút "Xác nhận đặt hàng"

### 5. THEO DÕI ĐƠN HÀNG

**Chưa đăng nhập:**

* Thông báo yêu cầu đăng ký, Nút "Đăng nhập" / "Đăng ký"

**Đã đăng nhập:**

* **Tab:** "Đơn hàng của bạn" (đang xử lý), "Lịch sử" (đã hoàn thành)

* **Khi chưa có đơn hàng:** Icon trống, Thông báo "Bạn chưa có đơn hàng nào đang giao"

* **Khi có đơn hàng:** Mã đơn hàng, Ngày đặt, Trạng thái (Đang xử lý/Đã xác nhận/Đang giao/Đã giao/Đã hủy), Chi tiết sản phẩm, Thông tin giao hàng, Tổng tiền, Hành động (Xem chi tiết/Hủy/Mua lại)

### 6. TÌM KIẾM & LỌC

* **Tìm kiếm cơ bản:** Ô nhập tên sản phẩm, Hiển thị kết quả khớp

* **Lọc theo danh mục:** Click danh mục để lọc sản phẩm

* **Sắp xếp:** Theo giá, mới nhất, bán chạy, khuyến mãi

### 7. TÀI KHOẢN NGƯỜI DÙNG

**Đăng ký tài khoản:**

* **Thông tin cơ bản:**

  * Họ và tên (bắt buộc)

  * Số điện thoại (bắt buộc, có thể dùng để đăng ký)

  * Email (bắt buộc)

  * Mật khẩu (bắt buộc)

  * Xác nhận mật khẩu

* **Upload giấy phép (bắt buộc):**

  * Upload file giấy phép kinh doanh/giấy phép liên quan

  * Hỗ trợ định dạng: PDF, JPG, PNG

  * Kích thước file tối đa: 5MB

  * Có thể upload nhiều file nếu cần

* **Thông tin bổ sung:**

  * Địa chỉ

  * Ghi chú (nếu có)

* **Xác nhận:** Sau khi đăng ký, tài khoản ở trạng thái "Chờ duyệt"

* **Thông báo:** "Đăng ký thành công. Tài khoản của bạn đang chờ admin duyệt. Chúng tôi sẽ thông báo qua email/SMS khi tài khoản được duyệt."

**Đăng nhập:**

* Đăng nhập bằng số điện thoại hoặc email

* Mật khẩu

* Có thể đăng nhập bằng số điện thoại (OTP) nếu tích hợp

* Sau đăng nhập: Header hiển thị avatar + tên, Menu dropdown

* Hiển thị trạng thái tài khoản (Đã duyệt/Chờ duyệt/Từ chối)

**Trạng thái tài khoản:**

* **Chờ duyệt:** Không thể xem chi tiết sản phẩm và đặt hàng, chỉ xem được trang giới thiệu

* **Đã duyệt:** Có đầy đủ quyền xem sản phẩm và đặt hàng

* **Từ chối:** Hiển thị lý do từ chối, có thể đăng ký lại với giấy tờ mới

**Quản lý tài khoản (khi đã đăng nhập):**

* **Thông tin cá nhân:** Xem/chỉnh sửa (Họ tên, Email, SĐT, Ngày sinh, Giới tính), Đổi mật khẩu, Cập nhật avatar

* **Giấy phép:** Xem lại giấy phép đã upload, Upload lại nếu bị từ chối

* **Trạng thái tài khoản:** Xem trạng thái duyệt tài khoản, Lịch sử duyệt

* **Địa chỉ giao hàng:** Danh sách địa chỉ đã lưu, Thêm/sửa/xóa, Đặt địa chỉ mặc định

* **Lịch sử đơn hàng:** Xem tất cả đơn hàng (chỉ khi tài khoản đã được duyệt), Lọc theo trạng thái, Xem chi tiết, In hóa đơn

* **Đăng xuất:** Nút trong menu dropdown

### 8. YÊU THÍCH

* **Lưu sản phẩm:** Click icon "Yêu thích" trên sản phẩm (yêu cầu đăng nhập)

* **Quản lý:** Xem danh sách đã lưu, Xóa khỏi danh sách, Thêm vào giỏ hàng

### 9. CHAT/NHẮN TIN

**Truy cập:**

* Icon Chat ở header (có thể có badge thông báo tin nhắn mới)

* Click để mở cửa sổ chat

**Giao diện chat:**

* **Sidebar navigation:** Avatar người dùng, Icon Home, Icon Messages/Chat (highlighted), Icon Giỏ hàng

* **Danh sách tin nhắn (bên trái):**

  * Tiêu đề "Tất cả tin nhắn"

  * Thanh tìm kiếm với icon kính lúp, placeholder "Tìm kiếm"

  * Icon thư + text "tất cả" (lọc tin nhắn)

  * Danh sách các cuộc trò chuyện với avatar, tên, tin nhắn cuối (có thể hiển thị "[Hình ảnh]")

  * Cuộc trò chuyện đang active được highlight

* **Cửa sổ chat (bên phải):**

  * Header: Avatar + tên người nhận (ví dụ: "DANH MỤC HÀNG"), Trạng thái online "Online vài phút trước"

  * Khu vực tin nhắn: Hiển thị lịch sử tin nhắn

  * Tin nhắn tự động chào mừng: "DANH MỤC HÀNG chào mừng Anh/Chị đã ghé thăm cửa hàng. Vui lòng để lại số điện thoại để được tư vấn nhanh nhất."

  * Input area: Ô nhập tin nhắn, Icon gửi (máy bay), Icon đính kèm hình ảnh, Icon menu (3 chấm) - thêm tùy chọn

**Tính năng:**

* Gửi/nhận tin nhắn text

* Đính kèm hình ảnh

* Tìm kiếm trong danh sách tin nhắn

* Lọc tin nhắn (tất cả, chưa đọc, ...)

* Hiển thị trạng thái online/offline

* Thông báo tin nhắn mới (badge trên icon)

* Tin nhắn tự động chào mừng khi khách vào chat

* Lưu lịch sử tin nhắn

**Mục đích:**

* Tư vấn sản phẩm trực tuyến

* Hỗ trợ khách hàng nhanh chóng

* Thu thập thông tin liên hệ (số điện thoại) để tư vấn

* Tăng tương tác và tỷ lệ chuyển đổi

### 10. QUY TRÌNH MUA HÀNG

**Quy trình đầy đủ:**

1. **Xem sản phẩm (không cần đăng nhập):**

   * Khách hàng có thể xem trang giới thiệu công ty công khai

   * Xem danh sách sản phẩm công khai

   * Xem chi tiết sản phẩm công khai (hình ảnh, mô tả, giá)

2. **Khi muốn đặt hàng:**

   * Click "Thêm vào giỏ" hoặc "Mua ngay"

   * Hệ thống yêu cầu đăng nhập/đăng ký

3. **Đăng ký tài khoản:**

   * Điền thông tin cơ bản (Họ tên, SĐT, Email, Mật khẩu)

   * Upload giấy phép (bắt buộc)

   * Xác nhận đăng ký

   * Tài khoản ở trạng thái "Chờ duyệt"

4. **Chờ duyệt tài khoản:**

   * Admin kiểm tra giấy phép

   * Duyệt hoặc từ chối tài khoản

   * Khách hàng nhận thông báo qua email/SMS

5. **Sau khi được duyệt:**

   * Đăng nhập vào hệ thống

   * Có thể thêm sản phẩm vào giỏ hàng

   * Đặt hàng và thanh toán

   * Theo dõi đơn hàng

**Quy trình khi đã đăng nhập (tài khoản đã được duyệt):**

1. Xem danh sách sản phẩm (công khai) → 2. Xem chi tiết sản phẩm (công khai) → 3. Tìm kiếm/Browse (có thể lưu yêu thích) → 4. Thêm vào giỏ (tự động lưu) → 5. Thanh toán (thông tin tự động điền, chọn địa chỉ đã lưu) → 6. Xác nhận đặt hàng → 7. Theo dõi (lưu vào lịch sử, có thể hủy/mua lại)

**Lợi ích của hệ thống duyệt tài khoản:**

* Đảm bảo chỉ khách hàng đủ điều kiện mới được đặt hàng

* Tuân thủ quy định pháp lý về kinh doanh dược phẩm

* Cho phép khách hàng xem sản phẩm tự do, tăng trải nghiệm người dùng

* Chỉ kiểm soát ở bước đặt hàng, đảm bảo an toàn pháp lý

* Tăng độ tin cậy và chuyên nghiệp của website

### 11. WEBSITE GIỚI THIỆU CÔNG TY

**Các trang:**

* **Trang chủ giới thiệu:** Hero banner, Tổng quan, Điểm nổi bật, Số liệu thống kê, CTA đến trang bán hàng

* **Giới thiệu về công ty:** Lịch sử hình thành, Tầm nhìn, Sứ mệnh, Giá trị cốt lõi

* **Thông tin công ty:** Tên, Lĩnh vực, Đối tác (KHAPHARCO, TIPHARCO, PYMEPHARCO, VACOPHARMA, AGIMEXPHARM, USP, NIC, MEDISUN, CETECO, VIDIPHA, MEKOPHAR), Địa chỉ, Hotline, Giờ làm việc

* **Đội ngũ:** Ban lãnh đạo, Nhân viên, Chuyên gia tư vấn

* **Thành tựu:** Giấy phép, Chứng nhận, Giải thưởng, Đối tác

* **Tin tức/Sự kiện:** Tin tức ngành, Sự kiện công ty, Khuyến mãi

* **Liên hệ:** Form liên hệ, Thông tin liên hệ, Bản đồ Google Maps

**Tích hợp:** Menu điều hướng giữa 2 phần, Footer/Header chung

## YÊU CẦU KỸ THUẬT

### Giao diện

* Thiết kế hiện đại, chuyên nghiệp, Responsive (desktop/tablet/mobile), User-friendly, Tốc độ tải nhanh

### Bảo mật

* SSL Certificate, Bảo vệ dữ liệu cá nhân, Hệ thống thanh toán an toàn (PCI DSS compliance), reCAPTCHA

### Tích hợp thanh toán

* Tích hợp các cổng thanh toán phổ biến: VNPay, MoMo, ZaloPay, Napas

* Hỗ trợ thanh toán khi nhận hàng (COD)

* Xử lý giao dịch an toàn, mã hóa thông tin thẻ

* Webhook để cập nhật trạng thái thanh toán

### SEO & Marketing

* SEO-friendly, Social media integration, Google Analytics

### Quản trị

* **Admin panel:**

  * Quản lý sản phẩm (thêm/sửa/xóa, quản lý danh mục, giá, tồn kho)

  * Quản lý đơn hàng (xem, xử lý, cập nhật trạng thái)

  * **Duyệt tài khoản người dùng (Quan trọng):**

    * Xem danh sách tài khoản chờ duyệt (có badge số lượng)

    * Xem chi tiết thông tin người dùng:

      * Thông tin cá nhân (Họ tên, SĐT, Email, Địa chỉ)

      * Giấy phép đã upload (xem trực tiếp trên trình duyệt, download)

      * Ngày đăng ký

      * Ghi chú (nếu có)

    * **Duyệt tài khoản:**

      * Click "Duyệt" để chấp nhận tài khoản

      * Tài khoản chuyển sang trạng thái "Đã duyệt"

      * Tự động gửi email/SMS thông báo cho người dùng

    * **Từ chối tài khoản:**

      * Click "Từ chối"

      * Nhập lý do từ chối (bắt buộc)

      * Tài khoản chuyển sang trạng thái "Đã từ chối"

      * Tự động gửi email/SMS thông báo kèm lý do

      * Người dùng có thể đăng ký lại với giấy tờ mới

    * **Quản lý danh sách:**

      * Lọc theo trạng thái (Chờ duyệt/Đã duyệt/Đã từ chối)

      * Tìm kiếm theo tên, SĐT, Email

      * Xem lịch sử duyệt/từ chối

      * Có thể thay đổi trạng thái tài khoản (nếu cần)

  * Quản lý nội dung (trang giới thiệu, tin tức, banner)

  * Báo cáo thống kê (doanh số, đơn hàng, người dùng, số lượng tài khoản)

  * Quản lý chat/nhắn tin với khách hàng

## SO SÁNH VỚI WEBSITE HIỆN TẠI

**Điểm mạnh cần giữ lại:**

* Giao diện đơn giản, dễ sử dụng

* Tìm kiếm và lọc sản phẩm hiệu quả

* Quản lý giỏ hàng và đơn hàng

* Theo dõi đơn hàng

* Chat/Nhắn tin tư vấn trực tuyến

**Điểm cần cải thiện:**

* Thiết kế chuyên nghiệp hơn, phù hợp thương hiệu

* Thêm phần giới thiệu công ty

* Tối ưu tốc độ và hiệu suất

* Cải thiện UX

* Tích hợp công cụ marketing tốt hơn

* Quản trị dễ dàng hơn

* Thêm hệ thống duyệt tài khoản với giấy phép

* Yêu cầu đăng nhập để đặt hàng (xem sản phẩm công khai)

* Hỗ trợ đăng ký bằng số điện thoại

## THÔNG TIN CỬA HÀNG

* **Tên:** DANH MỤC HÀNG

* **Hotline:** 0343 210 287

* **Giờ làm việc:** 08:00 - 17:30

* **Địa chỉ:** 134/1 Tô Hiến Thành, Phường 15, Quận 10, TP.HCM

* **Chuyên doanh:** Dược phẩm từ các nhà sản xuất: KHAPHARCO, TIPHARCO, PYMEPHARCO, VACOPHARMA, AGIMEXPHARM, USP, NIC, MEDISUN, CETECO, VIDIPHA, MEKOPHAR

**Các loại sản phẩm:** Vitamin và khoáng chất, Kháng sinh, Kháng viêm, Gan mật, Tẩy giun/Ký sinh trùng, Tim mạch, Tiêu hóa, Hô hấp, Da liễu, và nhiều loại khác

## THAM KHẢO

**Các website tham khảo chức năng:**

* <https://dozen.vn/> - Tham khảo hệ thống đăng ký với giấy phép và duyệt tài khoản

* <https://thuocsi.vn/> - Tham khảo chức năng bán dược phẩm trực tuyến

**Lưu ý:** Chức năng, các thông tin chính thống lấy từ website hiện tại: <https://danhmuchang.buynow.vn/home>

**Ghi chú:**

* Tài liệu này được tạo dựa trên phân tích website hiện tại và yêu cầu của khách hàng

* Website mới cần được phát triển dựa trên yêu cầu này và có thể bổ sung thêm tính năng theo nhu cầu thực tế

* **Yêu cầu đặc biệt:** Hệ thống yêu cầu đăng nhập để xem sản phẩm và duyệt tài khoản với giấy phép để đảm bảo tuân thủ quy định pháp lý về kinh doanh dược phẩm
