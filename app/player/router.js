var express = require("express");
var router = express.Router();
const { posts } = require("./controller");
// session
// const { isLoginAdmin } = require("../middleware/auth");
// router.use(isLoginAdmin);
/* index */
router.get("/posts", posts);

module.exports = router;
