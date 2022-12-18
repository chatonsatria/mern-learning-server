var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
} = require("./controller");
/* GET home page. */
router.get("/", index);
// create
router.get("/create", viewCreate);
router.post("/create", actionCreate);
// edit
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
// delete
router.delete("/delete/:id", actionDelete);

module.exports = router;
