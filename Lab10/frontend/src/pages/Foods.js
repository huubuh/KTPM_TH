import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api/api";

function Foods({ addToCart }) {
  const [foods, setFoods] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios
      .get(API.FOOD + "/foods")
      .then((res) => setFoods(res.data))
      .catch(() => console.log("Food service chưa chạy"));
  }, []);

  const filteredFoods = foods.filter((f) =>
    f.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2>Gần bạn có gì ngon?</h2>
          <p>Chọn món ăn bạn muốn đặt hôm nay</p>
        </div>

        <input
          className="search-input"
          placeholder="Tìm món ăn..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="food-grid">
        {filteredFoods.map((f) => (
          <div className="food-card" key={f.id}>
            <div className="food-img-wrap">
              <img src={f.image} alt={f.name} className="food-img" />
              <span className="discount-badge">Freeship</span>
            </div>

            <div className="food-content">
              <h3>{f.name}</h3>
              <p className="food-desc">Quán ngon được yêu thích</p>

              <div className="food-meta">
                <span>⭐ 4.8</span>
                <span>•</span>
                <span>15-20 phút</span>
              </div>

              <div className="food-bottom">
                <p className="price">{Number(f.price).toLocaleString()}đ</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(f)}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Foods;
