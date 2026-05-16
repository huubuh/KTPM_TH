import axios from "axios";
import { API } from "../api/api";

function Payment({ orderId, setOrderId, setCart, setReloadHistory }) {
  const pay = async (method) => {
    await axios.post(API.PAYMENT + "/payments", {
      orderId,
      method,
    });

    alert("Thanh toán thành công 🎉");

    setReloadHistory((prev) => !prev);
    setOrderId(null);
    setCart({});
  };

  return (
    <div className="payment-card">
      <h2>Thanh toán</h2>
      <p>
        Đơn hàng: <b>#{orderId}</b>
      </p>

      <button className="btn btn-primary full" onClick={() => pay("COD")}>
        Thanh toán COD
      </button>

      <button className="btn btn-outline full" onClick={() => pay("Banking")}>
        Banking
      </button>
    </div>
  );
}

export default Payment;
