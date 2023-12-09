const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const bodyParser = require("body-parser"); //MongoDB 받기 위해서
const cors = require("cors");
const mongoose = require("mongoose");

const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemsRoutes");
const itemsDetailRoutes = require("./routes/itemsDetailRoutes");

// body-parser 미들웨어 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//MongoDB 연결
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "tamburinsDB",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// categoryRoutes 기본 주소 등록
app.use("/categories", categoryRoutes);

// itemRoutes  기본 주소 등록
app.use("/items", itemRoutes);

// itemsDetailRoutes 기본 주소 등록
app.use("/detail", itemsDetailRoutes);

//서버 실행
app.listen(port, () => {
  console.log(`서버는 http://localhost:${port} 에서 실행중 ◝(・▿・)◜`);
});
