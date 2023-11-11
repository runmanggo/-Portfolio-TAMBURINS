const express = require("express");
const router = express.Router();

const MainCtg = require("../models/mainCtg");
const MainItems = require("../models/mainItems");
<<<<<<< HEAD
const Mainbanner = require("../models/mainbanner");
=======
>>>>>>> 7ebd9879f68962a90210fb7ca1d548d69ef2ea3e

// 카테고리 목록 조회
router.get("/", async (req, res) => {
  try {
    // 모든 mainCategory 데이터 불러오기
    const data = await MainCtg.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
router.get("/banner", async (req, res) => {
  try {
    // 모든 banner 데이터 불러오기
    const data = await Mainbanner.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

=======
>>>>>>> 7ebd9879f68962a90210fb7ca1d548d69ef2ea3e
router.get("/items", async (req, res) => {
  try {
    // 모든 mainItems 데이터 불러오기
    const data = await MainItems.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
