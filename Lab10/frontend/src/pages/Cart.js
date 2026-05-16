import axios from "axios";
import { API } from "../api/api";

function Cart({ cart, setCart, user, setOrderId }) {
  const cartItems = Object.entries(cart);

  const total = cartItems.reduce((sum, [, item]) => {
    return sum + item.food.price * item.qty;
  }, 0);

  const increase = (foodId) => {
    setCart((prev) => ({
      ...prev,
      [foodId]: {
        ...prev[foodId],
        qty: prev[foodId].qty + 1,
      },
    }));
  };

  const decrease = (foodId) => {
    setCart((prev) => {
      const item = prev[foodId];

      if (!item || item.qty <= 1) {
        const { [foodId]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [foodId]: {
          ...item,
          qty: item.qty - 1,
        },
      };
    });
  };

  const remove = (foodId) => {
    setCart((prev) => {
      const { [foodId]: _, ...rest } = prev;
      return rest;
    });
  };

  const createOrder = async () => {
    const items = {};

    cartItems.forEach(([foodId, item]) => {
      items[foodId] = item.qty;
    });

    const res = await axios.post(API.ORDER + "/orders", {
      userId: user.id,
      items,
    });

    setOrderId(res.data.id);
    alert("Tạo order thành công");
  };

  return (
    <div className="cart-card">
      <h2>Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>🛒</p>
          <span>Chưa có món nào</span>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map(([foodId, item]) => (
              <div className="cart-item" key={foodId}>
                <img src={item.food.image} alt={item.food.name} />

                <div className="cart-info">
                  <h4>{item.food.name}</h4>
                  <p>{Number(item.food.price).toLocaleString()}đ</p>

                  <div className="qty-row">
                    <button onClick={() => decrease(foodId)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increase(foodId)}>+</button>
                    <button
                      className="remove-btn"
                      onClick={() => remove(foodId)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Tổng tiền</span>
            <b>{total.toLocaleString()}đ</b>
          </div>

          <button className="btn btn-checkout" onClick={createOrder}>
            Tạo đơn hàng
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
