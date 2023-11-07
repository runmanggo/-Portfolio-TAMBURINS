const express = require("express");
const app = express();
const port = 8000;

const bodyParser = require("body-parser"); //mongoDB 받기 위해서
const cors = require("cors");

// body-parser 미들웨어 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => {
  console.log(`서버는 http://localhost:${port} 에서 실행중 ◝(・▿・)◜`);
});
