require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/auth.routes");
const apiRoutes = require("./routes/api.routes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(process.env.PORT || 9000, () => {
  console.log("Server running on port", process.env.PORT || 9000);
});
