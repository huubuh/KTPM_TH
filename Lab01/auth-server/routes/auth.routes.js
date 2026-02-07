const express = require("express");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
} = require("../services/token.service");

const router = express.Router();

/**
 * Demo login:
 * - username=admin => role ADMIN
 * - còn lại => role USER
 */
router.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username required" });

  const role = username === "admin" ? "ADMIN" : "USER";
  const sub = username;

  const accessToken = signAccessToken({ sub, role });
  const refreshToken = signRefreshToken({ sub, role });

  res.json({ accessToken, refreshToken, role });
});

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "refreshToken required" });

  try {
    const payload = verifyRefreshToken(refreshToken);
    const accessToken = signAccessToken({
      sub: payload.sub,
      role: payload.role,
    });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: "Invalid/revoked refresh token" });
  }
});

router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "refreshToken required" });

  revokeRefreshToken(refreshToken);
  res.json({ ok: true });
});

module.exports = router;
