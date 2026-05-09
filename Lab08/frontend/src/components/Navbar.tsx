import type { Page } from "../utils/helpers";

interface NavbarProps {
  cartCount: number;
  onNavigate: (page: Page) => void;
  userId: string;
  onLogout: () => void;
}

export default function Navbar({
  cartCount,
  onNavigate,
  userId,
  onLogout,
}: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => onNavigate("home")}>
        ⚡ FlashSale
      </div>

      <div className="nav-actions">
        <button className="nav-link" onClick={() => onNavigate("home")}>
          🏠 Trang chủ
        </button>
        <button className="cart-btn" onClick={() => onNavigate("cart")}>
          🛒 Giỏ hàng
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <div className="nav-user">
          <span className="nav-user-id">👤 {userId}</span>
          <button className="nav-logout-btn" onClick={onLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}
