// connection to db using mongoose
const mongoose = require("mongoose");
// import urldb
const { urlDb } = require("../config");
// set strict quesry false, all setting default true
mongoose.set("strictQuery", false);
// connect to db
mongoose.connect(urlDb);
// set connection
const db = mongoose.connection;
// export connection
module.exports = db;
