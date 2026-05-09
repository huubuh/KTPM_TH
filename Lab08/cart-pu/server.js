const express = require("express");
const cors = require("cors");
const redis = require("redis");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8082;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  socket: { host: REDIS_HOST, port: REDIS_PORT },
});

function log(msg, data = {}) {
  console.log(`[CART-PU] ${new Date().toISOString()} - ${msg}`, data);
}

// Add to cart
app.post("/cart/add", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined || quantity === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const cartKey = `cart:${userId}`;
    const cartRaw = await client.get(cartKey);
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    const existing = cart.find((item) => item.productId === productId);

    let totalQuantity = 0;
    let action = quantity > 0 ? "INCREASE" : "DECREASE";

    if (existing) {
      existing.quantity += quantity;
      totalQuantity = existing.quantity;
      if (existing.quantity <= 0) {
        const index = cart.findIndex((item) => item.productId === productId);
        cart.splice(index, 1);
        totalQuantity = 0;
        action = "REMOVED";
      }
    } else {
      if (quantity > 0) {
        cart.push({ productId, quantity });
      }
      totalQuantity = quantity;
      action = "ADDED";
    }

    await client.set(cartKey, JSON.stringify(cart));

    log(
      `[${action}] productId=${productId} | change=${quantity > 0 ? "+" : ""}${quantity} | total=${totalQuantity} | userId=${userId}`,
    );

    res.json({ message: "Added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart
app.get("/cart", async (req, res) => {
  try {
    const userId = req.query.userId;
    const cartKey = `cart:${userId}`;

    const cartRaw = await client.get(cartKey);
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    res.json({ data: cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

client.connect().then(() => {
  log("Connected Redis");

  app.listen(PORT, () => {
    log(`Running on port ${PORT}`);
  });
});
