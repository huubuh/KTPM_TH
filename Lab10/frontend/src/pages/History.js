import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api/api";

function History({ reloadHistory }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get(API.PAYMENT + "/payments");
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, [reloadHistory]);

  return (
    <div className="section history-section">
      <h2>Lịch sử thanh toán</h2>

      {history.length === 0 ? (
        <p className="muted">Chưa có thanh toán nào</p>
      ) : (
        <div className="history-list">
          {history.map((p, index) => (
            <div className="history-item" key={index}>
              <div>
                <b>Order #{p.orderId}</b>
                <p>{p.method || "COD"}</p>
              </div>
              <span className="status">{p.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
