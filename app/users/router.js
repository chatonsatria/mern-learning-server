var express = require("express");
var router = express.Router();
const { viewLogin, actionLogin, actionLogout } = require("./controller");
/* index. */
router.get("/", viewLogin);
router.post("/", actionLogin);
router.get("/logout", actionLogout);

module.exports = router;
