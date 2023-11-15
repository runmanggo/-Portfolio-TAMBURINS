const express = require("express");
const router = express.Router();

const ItemsDetail = require("../models/itemsDetail");

router.get("/", async (req, res) => {
  try {
    const data = await ItemsDetail.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
