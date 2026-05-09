import type { Product, CartItem } from "../api";
import { formatPrice } from "../utils/helpers";

interface CartPageProps {
  cart: CartItem[];
  products: Product[];
  checkoutLoading: boolean;
  onCheckout: () => void;
  onGoHome: () => void;
  onAddMore: (productId: string) => void;
  onDecrease: (productId: string) => void;
}

export default function CartPage({
  cart,
  products,
  checkoutLoading,
  onCheckout,
  onGoHome,
  onAddMore,
  onDecrease,
}: CartPageProps) {
  const getProduct = (id: string) => products.find((p) => p.id === id);

  const cartTotal = cart.reduce((sum, item) => {
    const p = getProduct(item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2 className="page-title">Giỏ hàng</h2>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Giỏ hàng của bạn đang trống</p>
          <button className="btn-primary" onClick={onGoHome}>
            Mua sắm ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="page-title">Giỏ hàng ({cartCount} sản phẩm)</h2>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => {
            const p = getProduct(item.productId);

            return (
              <div key={item.productId} className="cart-row">
                <div className="cart-row-icon">
                  {p ? (
                    <img src={p.image} alt={p.name} className="cart-row-img" />
                  ) : (
                    "📦"
                  )}
                </div>

                <div className="cart-row-info">
                  <div className="cart-row-name">
                    {p?.name || item.productId}
                  </div>
                  <div className="cart-row-price">
                    {p ? formatPrice(p.price) : ""} / cái
                  </div>
                </div>

                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => onDecrease(item.productId)}
                  >
                    −
                  </button>

                  <span className="qty-num">{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => onAddMore(item.productId)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-row-subtotal">
                  {p ? formatPrice(p.price * item.quantity) : ""}
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Tóm tắt đơn hàng</h3>

          <div className="summary-lines">
            {cart.map((item) => {
              const p = getProduct(item.productId);

              return (
                <div key={item.productId} className="summary-item">
                  <span className="summary-item-name">
                    {p?.name || item.productId} ×{item.quantity}
                  </span>
                  <span>{p ? formatPrice(p.price * item.quantity) : ""}</span>
                </div>
              );
            })}
          </div>

          <div className="summary-row">
            <span>Số sản phẩm</span>
            <span>{cartCount}</span>
          </div>

          <div className="summary-row total">
            <span>Tổng tiền</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <button
            className="btn-checkout"
            onClick={onCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Đang xử lý..." : " Thanh toán ngay"}
          </button>

          <button className="btn-outline" onClick={onGoHome}>
            ← Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
}
