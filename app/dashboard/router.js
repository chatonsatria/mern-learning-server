var express = require("express");
var router = express.Router();
const { index } = require("./controller");
// session
const { isLoginAdmin } = require("../middleware/auth");
router.use(isLoginAdmin);
// end session
router.get("/", index);

module.exports = router;
