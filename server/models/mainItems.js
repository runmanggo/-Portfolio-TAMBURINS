const mongoose = require("mongoose");

const MainItemsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ctgId: Number,
  itemId: Number,
  category: String,
  name: String,
  isAllview: Boolean,
  isBest: Boolean,
  isGiftSet: Boolean,
  img: String,
  desc: mongoose.Schema.Types.Mixed,
  price: Number,
  capacity: String,
  quantity: Number,
});

const MainItems = mongoose.model("MainItems", MainItemsSchema, "mainItems");

module.exports = MainItems;
