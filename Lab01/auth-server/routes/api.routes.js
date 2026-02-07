const express = require("express");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/public", (req, res) =>
  res.json({ ok: true, msg: "public endpoint" }),
);

router.get("/user", auth(["USER", "ADMIN"]), (req, res) => {
  res.json({ ok: true, endpoint: "user", user: req.user });
});

router.get("/admin", auth(["ADMIN"]), (req, res) => {
  res.json({ ok: true, endpoint: "admin", user: req.user });
});

module.exports = router;
