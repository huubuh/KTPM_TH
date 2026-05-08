# Lab 8 - Quick Start Guide

Hệ thống gồm: `frontend`, `product-pu`, `cart-pu`, `order-pu`, `inventory-pu`.
Mỗi máy sẽ chạy 1 node.

---

## 0. Node phân công

| Node | Chạy container        |
| ---- | --------------------- |
| A    | frontend + product-pu |
| B    | cart-pu               |
| C    | order-pu              |
| D    | inventory-pu          |

---

## 1. Tạo file `.env` trên từng máy

Ví dụ máy A (Product PU + FE):

```
REDIS_HOST=192.168.0.101
REDIS_PORT=6379

PRODUCT_API=http://192.168.0.101:8081
CART_API=http://192.168.0.102:8082
ORDER_API=http://192.168.0.103:8083
INVENTORY_API=http://192.168.0.104:8084
```

- Máy B: Cart PU, thay `CART_API` và `REDIS_HOST` theo IP máy B
- Máy C: Order PU
- Máy D: Inventory PU

---

## 2. Chạy container với Docker Compose

Máy A:

```
docker-compose -f docker-compose.nodeA.yml up -d
```

Máy B:

```
docker-compose -f docker-compose.nodeB.yml up -d
```

Máy C:

```
docker-compose -f docker-compose.nodeC.yml up -d
```

Máy D:

```
docker-compose -f docker-compose.nodeD.yml up -d
```

---

## 3. Truy cập FE

- URL: `http://<IP-máy-A>:3000`
- FE sẽ gọi thẳng các PU qua IP LAN trong `.env`

---

## 4. Restart container

```
docker-compose -f docker-compose.nodeA.yml up -d
```

> Docker sẽ update container nếu code thay đổi.

---

## 5. Kiểm tra logs

```
docker logs -f <container_name>
```

- FE: port 3000
- PU: kiểm tra Redis và dữ liệu seed
