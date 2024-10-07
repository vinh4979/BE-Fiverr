# Fiverr Clone API

Đây là dự án backend cho một ứng dụng clone của Fiverr, được phát triển như một dự án cuối khóa cho Cybersoft Academy.

## Công nghệ sử dụng

- NestJS: Framework backend cho Node.js
- Prisma: ORM (Object-Relational Mapping) để tương tác với cơ sở dữ liệu
- PostgreSQL: Hệ quản trị cơ sở dữ liệu
- JWT: JSON Web Tokens cho xác thực người dùng
- Swagger: Tạo tài liệu API tự động
- Cloudinary: Dịch vụ lưu trữ và quản lý hình ảnh

## Cài đặt

1. Clone repository
2. Cài đặt các dependencies: `npm install`
3. Tạo file `.env` và cấu hình các biến môi trường cần thiết
4. Chạy migration Prisma: `npx prisma migrate dev`
5. Khởi động server: `npm run start:dev`

## API Endpoints

### Auth

- POST /auth/register: Đăng ký tài khoản mới
- POST /auth/login: Đăng nhập và nhận token JWT

### Users

- GET /users: Lấy danh sách người dùng
- GET /users/:id: Lấy thông tin người dùng theo ID
- PATCH /users: Cập nhật thông tin người dùng
- DELETE /users/:id: Xóa người dùng

### Jobs

- GET /jobs: Lấy danh sách công việc
- POST /jobs: Tạo công việc mới
- PATCH /jobs: Cập nhật thông tin công việc
- DELETE /jobs/:id: Xóa công việc
- GET /jobs/:id: Lấy thông tin công việc theo ID
- GET /jobs/type/:typeId: Lấy danh sách công việc theo loại

### Job Types

- GET /job-type: Lấy danh sách loại công việc
- POST /job-type: Tạo loại công việc mới
- PATCH /job-type/:id: Cập nhật thông tin loại công việc
- DELETE /job-type/:id: Xóa loại công việc

### Job Details

- GET /job-detail: Lấy danh sách chi tiết công việc
- POST /job-detail: Tạo chi tiết công việc mới
- PUT /job-detail: Cập nhật thông tin chi tiết công việc
- PUT /job-detail/job-detail: Cập nhật chi tiết của loại công việc
- PUT /job-detail/update-image: Cập nhật hình ảnh cho chi tiết công việc
- DELETE /job-detail/job-detail: Xóa chi tiết công việc

### Job Hire

- GET /job-hire: Lấy danh sách công việc đã thuê
- POST /job-hire: Thuê công việc
- PATCH /job-hire/complete: Hoàn thành công việc đã thuê
- GET /job-hire/:id: Lấy thông tin công việc đã thuê theo ID
- DELETE /job-hire/:id: Xóa công việc đã thuê

### Comments

- POST /comment: Tạo bình luận mới
- GET /comment/:jobId: Lấy danh sách bình luận theo công việc
- PATCH /comment: Cập nhật bình luận
- DELETE /comment/:id: Xóa bình luận

## Tài liệu API

Sau khi khởi động server, bạn có thể truy cập tài liệu API Swagger tại:

http://localhost:8080/api

## Đóng góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo issue hoặc pull request để đóng góp vào dự án.

## Giấy phép

[MIT](https://choosealicense.com/licenses/mit/)