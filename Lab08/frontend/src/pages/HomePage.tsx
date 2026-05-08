import type { Product } from "../api";
import { formatPrice } from "../utils/helpers";

interface HomePageProps {
  products: Product[];
  loading: boolean;
  onViewDetail: (product: Product) => void;
}

export default function HomePage({
  products,
  loading,
  onViewDetail,
}: HomePageProps) {
  return (
    <div>
      {/* Hero */}
      <div className="home-hero">
        <div className="hero-badge">⚡ FLASH SALE</div>
        <h1>Săn deal siêu tốc</h1>
        <p>
          Hàng ngàn sản phẩm công nghệ — giá sốc, giao nhanh, thanh toán tức thì
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  onViewDetail,
}: {
  product: Product;
  onViewDetail: (p: Product) => void;
}) {
  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock < 10;

  return (
    <div
      className={`product-card ${isOut ? "sold-out" : ""}`}
      onClick={() => !isOut && onViewDetail(product)}
    >
      {isLow && <div className="badge-hot">🔥 Gần hết</div>}
      {isOut && <div className="badge-sold">Hết hàng</div>}

      <img src={product.image} className="product-card-img" />
      <div className="product-name">{product.name}</div>
      <div className="product-price">{formatPrice(product.price)}</div>
      <div className={`product-stock-badge ${isOut ? "out" : ""}`}>
        {isOut ? "Hết hàng" : `Còn ${product.stock}`}
      </div>

      <button
        className="btn-view"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetail(product);
        }}
        disabled={isOut}
      >
        Xem chi tiết
      </button>
    </div>
  );
}
