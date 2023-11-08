const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const bodyParser = require("body-parser"); //MongoDB 받기 위해서
const cors = require("cors");
const mongoose = require("mongoose");

// body-parser 미들웨어 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//MongoDB 연결
// 실서비스는 임의로 작성
const uri =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    : "mongodb://localhost:27017/tamburinsDB";

mongoose.connect(uri);

const MainCtg = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ctgId: Number,
  category: String,
  sliderTitle: String,
  sliderImg: String,
  bannerTitle: String,
  bannerImg: String,
  bannerVideo: String,
  bannerContent: String,
});

//서버 실행
app.listen(port, () => {
  console.log(`서버는 http://localhost:${port} 에서 실행중 ◝(・▿・)◜`);
});
