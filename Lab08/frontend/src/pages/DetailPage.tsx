import { useState } from "react";
import type { Product, CartItem } from "../api";
import { formatPrice } from "../utils/helpers";

interface DetailPageProps {
  product: Product;
  cart: CartItem[];
  addingToCart: boolean;
  onBack: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onGoCart: () => void;
}

export default function DetailPage({
  product,
  cart,
  addingToCart,
  onBack,
  onAddToCart,
  onGoCart,
}: DetailPageProps) {
  const [qty, setQty] = useState(1);

  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock < 10;
  const maxQty = Math.min(product.stock, 99);
  const inCart = cart.find((i) => i.productId === product.id);

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={onBack}>
        ← Quay lại danh sách
      </button>

      <div className="detail-card">
        {/* Left — icon */}
        <div className="detail-icon-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="detail-product-img"
          />
        </div>

        {/* Right — info */}
        <div className="detail-info">
          <div>
            {/* <span className="detail-product-id">
              {product.id.toUpperCase()}
            </span> */}
            <h2 className="detail-name">{product.name}</h2>
          </div>

          <div className="detail-price">{formatPrice(product.price)}</div>

          <div
            className={`detail-stock-tag ${isOut ? "out" : isLow ? "low" : ""}`}
          >
            {isOut
              ? "❌ Hết hàng"
              : isLow
                ? `⚠️ Chỉ còn ${product.stock} sản phẩm`
                : `✅ Còn ${product.stock} sản phẩm`}
          </div>

          {inCart && (
            <div className="in-cart-note">
              🛒 Bạn đang có <strong>{inCart.quantity}</strong> sản phẩm trong
              giỏ.{" "}
              <span className="link" onClick={onGoCart}>
                Xem giỏ hàng →
              </span>
            </div>
          )}

          {!isOut && (
            <div className="add-section">
              <label className="qty-label">Số lượng</label>
              <div className="qty-row">
                <div className="qty-control large">
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                  >
                    −
                  </button>
                  <span className="qty-num">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                    disabled={qty >= maxQty}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => onAddToCart(product.id, qty)}
                  disabled={addingToCart}
                >
                  {addingToCart ? "Đang thêm..." : `🛒 Thêm ${qty} vào giỏ`}
                </button>
              </div>

              <div className="price-preview">
                Tạm tính: <strong>{formatPrice(product.price * qty)}</strong>
              </div>
            </div>
          )}

          <div className="detail-meta">
            <MetaRow label="Mã sản phẩm" value={product.id.toUpperCase()} />
            <MetaRow label="Tồn kho" value={`${product.stock} sản phẩm`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="meta-item">
      <span className="meta-label">{label}</span>
      <span className="meta-value">{value}</span>
    </div>
  );
}
