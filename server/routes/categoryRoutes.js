const express = require("express");
const router = express.Router();

const MainCtg = require("../models/mainCtg");

// 카테고리 목록 조회
router.get("/", async (req, res) => {
  try {
    // 모든 데이터 불러오기
    const data = await MainCtg.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
