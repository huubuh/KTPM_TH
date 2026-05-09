const express = require("express");
const cors = require("cors");
const redis = require("redis");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8084;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

function log(msg, data = {}) {
  console.log(`[INVENTORY-PU] ${new Date().toISOString()} - ${msg}`, data);
}

// Lua script để giảm stock atomic, tránh oversell
const decreaseStockScript = `
local stockKey = KEYS[1]
local quantity = tonumber(ARGV[1])
local currentStock = tonumber(redis.call("GET", stockKey) or "0")

if currentStock < quantity then
  return -1
end

local newStock = currentStock - quantity
redis.call("SET", stockKey, newStock)
return newStock
`;

app.get("/stock/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const stock = await client.get(`stock:${productId}`);

    log("GET /stock", {
      productId,
      stock: Number(stock || 0),
    });

    res.json({
      productId,
      stock: Number(stock || 0),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.post("/stock/decrease", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || Number(quantity) <= 0) {
      return res.status(400).json({
        message: "productId and quantity are required",
      });
    }

    const newStock = await client.eval(decreaseStockScript, {
      keys: [`stock:${productId}`],
      arguments: [String(quantity)],
    });

    if (newStock === -1) {
      log("Not enough stock", {
        productId,
        quantity,
      });

      return res.status(400).json({
        message: "Not enough stock",
        productId,
      });
    }

    log("Stock decreased", {
      productId,
      quantity,
      newStock,
    });

    res.json({
      message: "Stock decreased",
      productId,
      newStock,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.post("/admin/stock", async (req, res) => {
  try {
    const { productId, stock } = req.body;

    if (!productId || stock === undefined || Number(stock) < 0) {
      return res.status(400).json({
        message: "productId and stock are required",
      });
    }

    await client.set(`stock:${productId}`, Number(stock));

    log("Admin set stock", {
      productId,
      stock: Number(stock),
    });

    res.json({
      message: "Stock updated",
      productId,
      stock: Number(stock),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

client.connect().then(() => {
  log("Connected Redis", {
    REDIS_HOST,
    REDIS_PORT,
  });

  app.listen(PORT, () => {
    log(`Running on port ${PORT}`);
  });
});
