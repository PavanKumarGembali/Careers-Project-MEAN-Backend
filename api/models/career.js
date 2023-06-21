const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Career = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    jobPosition: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    dateOfPost: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
  },
  {
    collection: "careers",
  }
);
module.exports = mongoose.model("Career", Career);
