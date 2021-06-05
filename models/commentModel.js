const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {},
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
