import { useState, useEffect, useCallback } from 'react'
import { productApi, cartApi, orderApi } from './api'
import type { Product, CartItem, Order } from './api'
import type { Page } from './utils/helpers'
import { USER_ID } from './utils/helpers'

import Navbar from './components/Navbar'
import Toast from './components/Toast'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import CartPage from './pages/CartPage'
import SuccessPage from './pages/SuccessPage'

import './App.css'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  const [loadingProducts, setLoadingProducts] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true)
      const data = await productApi.getAll()
      setProducts(data)
    } catch {
      showToast('Không thể tải danh sách sản phẩm', 'error')
    } finally {
      setLoadingProducts(false)
    }
  }, [])

  const fetchCart = useCallback(async () => {
    try {
      const data = await cartApi.get(USER_ID)
      setCart(data)
    } catch {
      // silent
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [fetchProducts, fetchCart])

  // ── Handlers ───────────────────────────────────────────────────

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product)
    setPage('detail')
  }

  const handleAddToCart = async (productId: string, quantity: number) => {
    setAddingToCart(true)
    try {
      await cartApi.add(USER_ID, productId, quantity)
      await fetchCart()
      showToast(`Đã thêm ${quantity} sản phẩm vào giỏ!`)
    } catch {
      showToast('Lỗi khi thêm vào giỏ hàng', 'error')
    } finally {
      setAddingToCart(false)
    }
  }

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    try {
      const order = await orderApi.checkout(USER_ID)
      setLastOrder(order)
      await fetchCart()
      await fetchProducts()
      setPage('success')
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message
      showToast('Checkout thất bại: ' + msg, 'error')
    } finally {
      setCheckoutLoading(false)
    }
  }

  // ── Helpers cho SuccessPage ─────────────────────────────────────
  const getProductName = (id: string) =>
    products.find(p => p.id === id)?.name || id

  const getProductPrice = (id: string) =>
    products.find(p => p.id === id)?.price || 0

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  // ── Render ──────────────────────────────────────────────────────

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <HomePage
            products={products}
            loading={loadingProducts}
            onViewDetail={handleViewDetail}
          />
        )

      case 'detail':
        return selectedProduct ? (
          <DetailPage
            product={selectedProduct}
            cart={cart}
            addingToCart={addingToCart}
            onBack={() => setPage('home')}
            onAddToCart={handleAddToCart}
            onGoCart={() => setPage('cart')}
          />
        ) : null

      case 'cart':
        return (
          <CartPage
            cart={cart}
            products={products}
            checkoutLoading={checkoutLoading}
            onCheckout={handleCheckout}
            onGoHome={() => setPage('home')}
            onAddMore={(productId) => handleAddToCart(productId, 1)}
          />
        )

      case 'success':
        return lastOrder ? (
          <SuccessPage
            order={lastOrder}
            getProductName={getProductName}
            getProductPrice={getProductPrice}
            onContinue={() => setPage('home')}
          />
        ) : null

      default:
        return null
    }
  }

  return (
    <div className="page-wrapper">
      <Navbar cartCount={cartCount} onNavigate={setPage} />
      {renderPage()}
      <Toast toast={toast} />
    </div>
  )
}