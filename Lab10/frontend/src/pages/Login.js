import axios from "axios";
import { useState } from "react";
import { API } from "../api/api";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post(API.USER + "/register", {
      username,
      password,
      role: "USER",
    });

    alert("Register thành công");
  };

  const login = async () => {
    const res = await axios.post(API.USER + "/login", {
      username,
      password,
    });

    setUser(res.data);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>GrabFood Mini</h1>
        <p>Đặt món nội bộ nhanh, gọn, dễ demo service-based architecture.</p>
      </div>

      <div className="login-card">
        <h2>Đăng nhập</h2>
        <p>Nhập tài khoản để tiếp tục</p>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary full" onClick={login}>
          Login
        </button>

        <button className="btn btn-outline full" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
