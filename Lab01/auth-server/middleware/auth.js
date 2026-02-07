const { verifyAccessToken } = require("../services/token.service");

function auth(requiredRoles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing Bearer token" });

    try {
      const payload = verifyAccessToken(token);
      req.user = payload; // { sub, role, iat, exp, iss }

      if (requiredRoles.length > 0 && !requiredRoles.includes(payload.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch {
      return res.status(401).json({ error: "Invalid/expired token" });
    }
  };
}

module.exports = { auth };
