# Tóm tắt ngắn gọn hệ thống

1. Hệ thống giải quyết vấn đề gì
- Cung cấp một kiến trúc microservices để xử lý xác thực người dùng (Auth), quản lý sản phẩm (Product) và xử lý đơn hàng (Order), kèm theo cơ chế kiểm thử tự động và triển khai bằng Docker + GitHub Actions.

2. Hệ thống có bao nhiêu dịch vụ
- Tổng cộng 4 dịch vụ chính: `auth`, `product`, `order`, `api-gateway`.

3. Ý nghĩa từng dịch vụ
- `auth`: Đăng ký, đăng nhập, phát và xác thực JWT cho người dùng.
- `product`: CRUD sản phẩm và cung cấp API cho frontend hoặc các dịch vụ khác.
- `order`: Xử lý tạo/điều chỉnh đơn hàng (business logic liên quan đến đơn hàng).
- `api-gateway`: (Nếu có) Tập trung điều phối, chuyển tiếp request và quản lý routing/ bảo mật.

4. Các mẫu thiết kế được sử dụng
- Kiến trúc Microservices (tách dịch vụ theo miền chức năng).
- Layered/Controller-Service-Repository (tách controller, service, repository).
- Repository pattern cho truy cập dữ liệu (Mongoose models + repository).
- JWT-based Authentication (token cho xác thực và bảo vệ route).
- Message broker (publish/subscribe) cho giao tiếp bất đồng bộ giữa dịch vụ (có util `messageBroker.js`).

5. Các dịch vụ giao tiếp như thế nào
- Giao tiếp đồng bộ: HTTP REST (Express) dùng JSON payloads.
- Xác thực: JWT truyền qua header `Authorization: Bearer <token>`.
- Giao tiếp bất đồng bộ: Message broker (ví dụ RabbitMQ) cho event/notification giữa dịch vụ.
- Dữ liệu: Mỗi dịch vụ sử dụng MongoDB (thường riêng database/collection) để tránh coupling dữ liệu trực tiếp.

---
File: `answers_short_vn.md` — đặt tại thư mục gốc dự án.
