const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ApplyList = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    collection: "appliedList",
  }
);

module.exports = mongoose.model("ApplyList", ApplyList);
