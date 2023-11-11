const express = require("express");
const router = express.Router();

const MainItems = require("../models/mainItems");

router.get("/", async (req, res) => {
  try {
    // 모든 mainItems 데이터 불러오기
    const data = await MainItems.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/best", async (req, res) => {
  try {
    const items = await MainItems.find({ isBest: true });
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
