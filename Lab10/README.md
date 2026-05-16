# Mini Food Ordering System

## Công nghệ sử dụng

### Frontend

- ReactJS
- Axios

### Backend

- Spring Boot
- Maven
- Resilience4j

### Architecture

- Service-Based Architecture
- REST API Communication

---

# Các service

| Service         | Port |
| --------------- | ---- |
| User Service    | 8081 |
| Food Service    | 8082 |
| Order Service   | 8083 |
| Payment Service | 8084 |
| Frontend        | 3000 |

---

# Yêu cầu môi trường

## Cài đặt

- Java 17
- NodeJS LTS
- Git

---

# Clone project

```bash
git clone <repo-url>
```

---

# Chạy Backend

Mở nhiều terminal riêng biệt.

---

## 1. User Service

```bash
cd user-service
.\mvnw spring-boot:run
```

---

## 2. Food Service

```bash
cd food-service
.\mvnw spring-boot:run
```

---

## 3. Order Service

```bash
cd order-service
.\mvnw spring-boot:run
```

---

## 4. Payment Service

```bash
cd payment-service
.\mvnw spring-boot:run
```

---

# Chạy Frontend

```bash
cd frontend
npm install
npm start
```

Frontend chạy tại:

```text
http://localhost:3000
```

---

# Cấu hình API

File:

```text
frontend/src/api/api.js
```

```js
export const API = {
  USER: "http://localhost:8081",
  FOOD: "http://localhost:8082",
  ORDER: "http://localhost:8083",
  PAYMENT: "http://localhost:8084",
};
```

---

# Demo hệ thống

## 1. Register tài khoản

- Nhập username/password
- Bấm Register

## 2. Login

- Login bằng tài khoản vừa tạo

## 3. Xem danh sách món ăn

- Food Service trả dữ liệu món ăn seed sẵn

## 4. Thêm vào giỏ hàng

- Chọn món
- Tăng / giảm số lượng

## 5. Tạo Order

- Frontend gọi Order Service
- Order Service gọi:
  - User Service
  - Food Service

## 6. Thanh toán

- Frontend gọi Payment Service
- Payment Service gọi Order Service
- Notification hiển thị console log

---

# Circuit Breaker

Project sử dụng:

```text
Resilience4j CircuitBreaker
```

để bảo vệ hệ thống khi:

- User Service lỗi
- Food Service lỗi
- Order Service lỗi

CircuitBreaker được cấu hình tại:

```text
order-service/src/main/resources/application.properties
payment-service/src/main/resources/application.properties
```

---

# Test Circuit Breaker

## Bước 1

Chạy toàn bộ service.

## Bước 2

Tạo order bình thường.

## Bước 3

Tắt:

```text
food-service
```

## Bước 4

Tạo order lại.

Kết quả:

- CircuitBreaker chuyển trạng thái OPEN
- Hệ thống không bị crash
- Fallback được gọi

---

# Lưu ý

Hiện project sử dụng:

```text
In-memory storage (ArrayList)
```

không sử dụng database thật.

Dữ liệu sẽ mất khi restart backend.

Ví dụ:

- user account
- orders
- payments

---

# API chính

## User Service

```text
POST /register
POST /login
GET  /users
```

## Food Service

```text
GET    /foods
POST   /foods
PUT    /foods/{id}
DELETE /foods/{id}
```

## Order Service

```text
POST /orders
GET  /orders
```

## Payment Service

```text
POST /payments
GET  /payments
```
