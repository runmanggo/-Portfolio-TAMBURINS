const mongoose = require("mongoose");

const MainCtgSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ctgId: Number,
  category: String,
  sliderTitle: String,
  sliderImg: String,
});

const MainCtg = mongoose.model("MainCtg", MainCtgSchema, "mainCategory");

module.exports = MainCtg;
