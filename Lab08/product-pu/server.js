const express = require("express");
const cors = require("cors");
const redis = require("redis");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

function log(msg, data = {}) {
  console.log(`[PRODUCT-PU] ${new Date().toISOString()} - ${msg}`, data);
}

async function seedProducts() {
  const exists = await client.exists("products:list");
  if (exists) {
    log("Products already seeded");
    return;
  }

  const products = [
    {
      id: "p1",
      image:
        "https://res.cloudinary.com/dicknpzdb/image/upload/v1778267177/cbedl0sbt40q7ahivdvc.webp",
      name: "Tai nghe Bluetooth AirPods 4 Chính hãng",
      price: 4490000,
      stock: 10,
    },
    {
      id: "p2",
      image:
        "https://res.cloudinary.com/dicknpzdb/image/upload/v1778267265/q22qdml8stkneiwoczbm.webp",
      name: "Logitech G PRO X Superlight 2C",
      price: 3189000,
      stock: 100,
    },
    {
      id: "p3",
      image:
        "https://res.cloudinary.com/dicknpzdb/image/upload/v1778267341/tfyfzqkyh0frvvgndlo4.webp",
      name: "Bàn phím không dây Aula F75 Sea Blue",
      price: 1290000,
      stock: 100,
    },
    {
      id: "p4",
      image:
        "https://res.cloudinary.com/dicknpzdb/image/upload/v1778267452/e7359llslotlyjdgg0aa.webp",
      name: "Màn hình Gaming LG Ultragear 27GP750",
      price: 3990000,
      stock: 40,
    },
    {
      id: "p5",
      image:
        "https://res.cloudinary.com/dicknpzdb/image/upload/v1778267532/itjkwdckvfpjsskpqdhx.jpg",
      name: "Đèn Led Treo Màn Hình Máy Tính Mijia MJGJD01YL",
      price: 890000,
      stock: 70,
    },
  ];

  for (const p of products) {
    const productData = {
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
    };

    await client.set(`products:${p.id}`, JSON.stringify(productData));
    await client.sAdd("products:list", p.id);
    await client.set(`stock:${p.id}`, p.stock);
  }

  log("Seed products done");
}

app.get("/products", async (req, res) => {
  try {
    const ids = await client.sMembers("products:list");
    const products = [];

    for (const id of ids) {
      const raw = await client.get(`products:${id}`);
      const stock = await client.get(`stock:${id}`);

      if (raw) {
        products.push({
          ...JSON.parse(raw),
          stock: Number(stock || 0),
        });
      }
    }

    log("GET /products", { count: products.length });

    res.json({
      source: "Redis Data Grid",
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const raw = await client.get(`products:${productId}`);

    if (!raw) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const stock = await client.get(`stock:${productId}`);

    res.json({
      source: "Redis Data Grid",
      data: {
        ...JSON.parse(raw),
        stock: Number(stock || 0),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

client.connect().then(async () => {
  log("Connected Redis", { REDIS_HOST, REDIS_PORT });

  await seedProducts();

  app.listen(PORT, () => {
    log(`Running on port ${PORT}`);
  });
});
