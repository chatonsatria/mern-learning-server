const mongoose = require("mongoose");
let categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "category name needed"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
