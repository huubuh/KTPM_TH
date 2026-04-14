const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect("mongodb://mongo:27017/testdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Model đơn giản
const Item = mongoose.model("Item", {
  name: String
});

// API
app.get("/", (req, res) => {
  res.send("Hello Node + MongoDB");
});

app.post("/items", async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.send(item);
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});