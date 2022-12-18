const mongoose = require("mongoose");
let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "category name needed"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
