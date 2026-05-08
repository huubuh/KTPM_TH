import type { Order, CartItem } from "../api";
import { formatPrice } from "../utils/helpers";

interface SuccessPageProps {
  order: Order;
  getProductName: (id: string) => string;
  getProductPrice: (id: string) => number;
  onContinue: () => void;
}

export default function SuccessPage({
  order,
  getProductName,
  getProductPrice,
  onContinue,
}: SuccessPageProps) {
  const total = order.items.reduce(
    (sum: number, item: CartItem) =>
      sum + getProductPrice(item.productId) * item.quantity,
    0,
  );

  return (
    <div className="success-page">
      <div className="success-card">
        <h2>Đặt hàng thành công!</h2>

        <div className="order-meta">
          <div className="order-meta-row">
            <span>Mã đơn hàng</span>
            <span className="order-id-val">
              {order.orderId.slice(0, 8).toUpperCase()}…
            </span>
          </div>
          <div className="order-meta-row">
            <span>Thời gian</span>
            <span>{new Date(order.createdAt).toLocaleString("vi-VN")}</span>
          </div>
        </div>

        <div className="order-items">
          <div className="order-items-title">Chi tiết đơn hàng</div>
          {order.items.map((item: CartItem) => (
            <div key={item.productId} className="order-item-row">
              <span className="order-item-name">
                {getProductName(item.productId)}
              </span>
              <span className="order-item-qty">×{item.quantity}</span>
              <span className="order-item-price">
                {formatPrice(getProductPrice(item.productId) * item.quantity)}
              </span>
            </div>
          ))}
          <div className="order-total-row">
            <span>Tổng cộng</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <button className="btn-primary" onClick={onContinue}>
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
}
