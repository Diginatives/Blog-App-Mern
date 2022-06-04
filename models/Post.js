const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    postbody: {
      type: String,
      required: true,
    },
    postimg: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    comment: {
      type: Array,
      required: false,
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);