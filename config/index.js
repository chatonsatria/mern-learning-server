// import dot env library to read .env file
const dotenv = require("dotenv");
// for image upload - install multer
const path = require("path");
// use dotenv
dotenv.config();
// export config
module.exports = {
  // set root path for image upload
  rootPath: path.resolve(__dirname, ".."),
  // set variabel from env
  serviceName: process.env.SERVICE_NAME,
  urlDb: process.env.MONGO_URL,
};
