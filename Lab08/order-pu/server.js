const express = require("express");
const cors = require("cors");
const redis = require("redis");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8083;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const INVENTORY_API = process.env.INVENTORY_API || "http://localhost:8084";

const client = redis.createClient({
  socket: { host: REDIS_HOST, port: REDIS_PORT },
});

function log(msg, data = {}) {
  console.log(`[ORDER-PU] ${new Date().toISOString()} - ${msg}`, data);
}

// Checkout
app.post("/checkout", async (req, res) => {
  try {
    const { userId } = req.body;

    const cartKey = `cart:${userId}`;
    const cartRaw = await client.get(cartKey);
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    log("Checkout start", { userId });

    for (const item of cart) {
      const resp = await axios.post(`${INVENTORY_API}/stock/decrease`, {
        productId: item.productId,
        quantity: item.quantity,
      });
      if (resp.data?.message !== "Stock decreased") {
        return res.status(400).json({ message: `Hết hàng: ${item.productId}` });
      }
    }

    const order = {
      orderId: uuidv4(),
      userId,
      items: cart,
      createdAt: new Date().toISOString(),
    };

    await client.set(`order:${order.orderId}`, JSON.stringify(order));

    // clear cart
    await client.del(cartKey);

    log("Checkout success", order);

    res.json({ message: "Checkout success", order });
  } catch (err) {
    res.status(500).json({
      message: "Checkout failed",
      error: err.response?.data || err.message,
    });
  }
});

client.connect().then(() => {
  log("Connected Redis");

  app.listen(PORT, () => {
    log(`Running on port ${PORT}`);
  });
});
