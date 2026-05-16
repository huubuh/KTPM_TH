import { useState } from "react";
import Login from "./pages/Login";
import Foods from "./pages/Foods";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import History from "./pages/History";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [orderId, setOrderId] = useState(null);
  const [reloadHistory, setReloadHistory] = useState(false);

  const addToCart = (food) => {
    setCart((prev) => {
      const current = prev[food.id];

      return {
        ...prev,
        [food.id]: {
          food,
          qty: current ? current.qty + 1 : 1,
        },
      };
    });
  };

  const logout = () => {
    setUser(null);
    setCart({});
    setOrderId(null);
  };

  if (!user) return <Login setUser={setUser} />;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h2>GrabFood Mini</h2>
          <p>Đặt món nội bộ nhanh chóng</p>
        </div>

        <div className="user-box">
          <span>
            Xin chào, <b>{user.username}</b>
          </span>
          <button className="btn btn-outline" onClick={logout}>
            Đăng xuất
          </button>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="tag">Ưu đãi hôm nay</p>
          <h1>Đặt món ngon, giao nhanh tới bàn làm việc</h1>
          <p>
            Chọn món yêu thích, tạo đơn hàng và thanh toán COD chỉ trong vài
            bước.
          </p>
        </div>
      </section>

      <main className="main-layout">
        <section className="left-content">
          <Foods addToCart={addToCart} />
          <History reloadHistory={reloadHistory} />
        </section>

        <aside className="right-content">
          <Cart
            cart={cart}
            setCart={setCart}
            user={user}
            setOrderId={setOrderId}
          />

          {orderId && (
            <Payment
              orderId={orderId}
              setOrderId={setOrderId}
              setCart={setCart}
              setReloadHistory={setReloadHistory}
            />
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
