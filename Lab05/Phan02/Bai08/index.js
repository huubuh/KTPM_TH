const express = require("express");
const mysql = require("mysql2");

const app = express();

const connectDB = () => {
  const connection = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root123",
    database: "mydb"
  });

  connection.connect((err) => {
    if (err) {
      console.log(" Đợi MySQL...");
      setTimeout(connectDB, 3000);
    } else {
      console.log(" Kết nối MySQL thành công!");
    }
  });
};

connectDB();

// ⭐ giữ app sống
app.get("/", (req, res) => {
  res.send("Node + MySQL OK ");
});

app.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});