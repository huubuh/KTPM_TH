import { useState, useEffect, useCallback } from "react";
import { productApi, cartApi, orderApi } from "./api";
import type { Product, CartItem, Order } from "./api";
import type { Page } from "./utils/helpers";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import LoginPage from "./pages/Loginpage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";

import "./App.css";

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);

  const [page, setPage] = useState<Page>("home");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const data = await productApi.getAll();
      setProducts(data);
    } catch {
      showToast("Không thể tải danh sách sản phẩm", "error");
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await cartApi.get(userId);
      setCart(data);
    } catch {
      // silent
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchProducts();
      fetchCart();
    }
  }, [userId, fetchProducts, fetchCart]);

  // ── Login ───────────────────────────────────────────────────────

  const handleLogin = (selectedUserId: string) => {
    setUserId(selectedUserId);
    setPage("home");
    setCart([]);
  };

  const handleLogout = () => {
    setUserId(null);
    setPage("home");
    setCart([]);
    setSelectedProduct(null);
    setLastOrder(null);
  };

  // ── Handlers ───────────────────────────────────────────────────

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setPage("detail");
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    if (!userId) return;
    setAddingToCart(true);
    try {
      await cartApi.add(userId, productId, quantity);
      await fetchCart();
      showToast(`Đã thêm ${quantity} sản phẩm vào giỏ!`);
    } catch {
      showToast("Lỗi khi thêm vào giỏ hàng", "error");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleCheckout = async () => {
    if (!userId) return;
    setCheckoutLoading(true);
    try {
      const order = await orderApi.checkout(userId);
      setLastOrder(order);
      await fetchCart();
      await fetchProducts();
      setPage("success");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      showToast("Checkout thất bại: " + msg, "error");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleDecrease = async (productId: string) => {
    if (!userId) return;
    try {
      await cartApi.add(userId, productId, -1);
      await fetchCart();
      showToast("Đã giảm số lượng sản phẩm");
    } catch {
      showToast("Lỗi khi giảm sản phẩm", "error");
    }
  };

  // ── Helpers cho SuccessPage ─────────────────────────────────────
  const getProductName = (id: string) =>
    products.find((p) => p.id === id)?.name || id;

  const getProductPrice = (id: string) =>
    products.find((p) => p.id === id)?.price || 0;

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  // ── Render ──────────────────────────────────────────────────────

  if (!userId) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <HomePage
            products={products}
            loading={loadingProducts}
            onViewDetail={handleViewDetail}
          />
        );

      case "detail":
        return selectedProduct ? (
          <DetailPage
            product={selectedProduct}
            cart={cart}
            addingToCart={addingToCart}
            onBack={() => setPage("home")}
            onAddToCart={handleAddToCart}
            onGoCart={() => setPage("cart")}
          />
        ) : null;

      case "cart":
        return (
          <CartPage
            cart={cart}
            products={products}
            checkoutLoading={checkoutLoading}
            onCheckout={handleCheckout}
            onGoHome={() => setPage("home")}
            onAddMore={(productId) => handleAddToCart(productId, 1)}
            onDecrease={handleDecrease}
          />
        );

      case "success":
        return lastOrder ? (
          <SuccessPage
            order={lastOrder}
            getProductName={getProductName}
            getProductPrice={getProductPrice}
            onContinue={() => setPage("home")}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar
        cartCount={cartCount}
        onNavigate={setPage}
        userId={userId}
        onLogout={handleLogout}
      />
      {renderPage()}
      <Toast toast={toast} />
    </div>
  );
}
