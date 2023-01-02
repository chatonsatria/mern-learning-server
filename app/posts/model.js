const mongoose = require("mongoose");
let postSchema = mongoose.Schema(
  {
    user: {
      type: String,
      ref: "Users",
    },
    title: {
      type: String,
      required: [true, "title tidak boleh kosong"],
    },
    post_content: {
      type: String,
      required: [true, "content tidak boleh kosong"],
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    status: {
      type: String,
      enum: ["0", "1", "2", "3"],
      default: "2",
    },
  },
  { timestamps: true }
);

// user - populate
// category - populate

module.exports = mongoose.model("Post", postSchema);
