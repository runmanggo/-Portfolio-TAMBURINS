const express = require("express");
const router = express.Router();

const ItemsDetail = require("../models/itemsDetail");

router.get("/", async (req, res) => {
  try {
    const items = await ItemsDetail.find();
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ItemsDetail.find({ itemId: id });

    if (!data) {
      return res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
