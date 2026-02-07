const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf8");
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, "utf8");

const refreshStore = new Map();

function signAccessToken({ sub, role }) {
  return jwt.sign({ sub, role }, privateKey, {
    algorithm: "RS256",
    expiresIn: process.env.ACCESS_TOKEN_TTL || "15m",
    issuer: process.env.JWT_ISSUER,
  });
}

function signRefreshToken({ sub, role }) {
  const token = jwt.sign({ sub, role, typ: "refresh" }, privateKey, {
    algorithm: "RS256",
    expiresIn: process.env.REFRESH_TOKEN_TTL || "7d",
    issuer: process.env.JWT_ISSUER,
  });
  refreshStore.set(token, { sub, role });
  return token;
}

function verifyAccessToken(token) {
  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
    issuer: process.env.JWT_ISSUER,
  });
}

function verifyRefreshToken(token) {
  const payload = jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
    issuer: process.env.JWT_ISSUER,
  });

  if (payload.typ !== "refresh") throw new Error("Not a refresh token");
  if (!refreshStore.has(token)) throw new Error("Refresh token revoked");

  return payload;
}

function revokeRefreshToken(token) {
  refreshStore.delete(token);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  revokeRefreshToken,
};
