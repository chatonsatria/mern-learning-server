const mongoose = require("mongoose");
let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email harus diisi"],
    },
    name: {
      type: String,
      required: [true, "name harus diisi"],
    },
    username: {
      type: String,
      required: [true, "username harus diisi"],
    },
    password: {
      type: String,
      required: [true, "password harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phonenumber: {
      type: String,
      required: [true, "nomor telepon harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
