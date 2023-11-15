const express = require("express");
const router = express.Router();

const MainItems = require("../models/mainItems");

// 모든 mainItems 데이터 불러오기
router.get("/", async (req, res) => {
  try {
    const data = await MainItems.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 카테고리에 따른 상품 필터링
router.get("/category", async (req, res) => {
  const { category } = req.query;

  try {
    const itemsCtg = await MainItems.find({ category: category });
    res.json(itemsCtg);
  } catch (err) {
    res.status(500).send(err);
  }
});

// 베스트 상품만
router.get("/best", async (req, res) => {
  try {
    const items = await MainItems.find({ isBest: true });
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

// 기프트 세트 상품만
router.get("/gift", async (req, res) => {
  try {
    const items = await MainItems.find({
      isGiftSet: true,
    });

    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

// allView에 들어갈 상품이지만, 원하는 순서대로
router.get("/all", async (req, res) => {
  try {
    const items = await MainItems.find({
      isAllview: true,
    });

    const order = [16, 12, 5, 4, 3, 10, 7, 8, 9, 11, 13, 14, 15];

    items.sort((a, b) => {
      return order.indexOf(a.ctgId) - order.indexOf(b.ctgId);
    });

    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
