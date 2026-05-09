interface LoginPageProps {
  onLogin: (userId: string) => void;
}

const USERS = [
  { id: "user1", label: "User 1", emoji: "🧑" },
  { id: "user2", label: "User 2", emoji: "👩" },
  { id: "user3", label: "User 3", emoji: "🧔" },
  { id: "user4", label: "User 4", emoji: "👱" },
];

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">⚡</div>
        <h1 className="login-title">Chào mừng trở lại</h1>
        <p className="login-subtitle">Chọn tài khoản để tiếp tục mua sắm</p>

        <div className="login-user-grid">
          {USERS.map((user) => (
            <button
              key={user.id}
              className="login-user-btn"
              onClick={() => onLogin(user.id)}
            >
              <span className="login-user-avatar">{user.emoji}</span>
              <span className="login-user-label">{user.label}</span>
              <span className="login-user-id">{user.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
