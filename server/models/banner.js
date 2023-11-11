const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ctgId: Number,
  category: String,
  bannerTitle: String,
  bannerImg: String,
  bannerVideo: String,
  bannerContent: String,
});

const Banner = mongoose.model("Banner", BannerSchema, "banner");

module.exports = Banner;
