const mongoose = require("mongoose");

const ItemsDetailSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ctgId: Number,
  itemId: Number,
  category: String,
  title: String,
  name: String,
  mainImg: mongoose.Schema.Types.Mixed, //string or Array
  mainVideo: String,
  price: Number,
  capacityImg: mongoose.Schema.Types.Mixed, //string or Array
  capacity: mongoose.Schema.Types.Mixed, //string or Array
  infoSummary: mongoose.Schema.Types.Mixed, //string or Array
  detailBt: String,
  detailBtnDesc: mongoose.Schema.Types.Mixed, //string or Array
  accordion1: Array,
  accordion3: Array,
});

const ItemsDetail = mongoose.model(
  "ItemsDetail",
  ItemsDetailSchema,
  "itemsDetail"
);

module.exports = ItemsDetail;
