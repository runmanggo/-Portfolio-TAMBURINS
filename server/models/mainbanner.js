const mongoose = require("mongoose");

const MainBannerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ctgId: Number,
  category: String,
  bannerTitle: String,
  bannerImg: String,
  bannerVideo: String,
  bannerContent: String,
});

const Mainbanner = mongoose.model("Mainbanner", MainBannerSchema, "banner");

module.exports = Mainbanner;
