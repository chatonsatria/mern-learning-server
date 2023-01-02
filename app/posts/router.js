var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  actionStatus,
} = require("./controller");

// session
const { isLoginAdmin } = require("../middleware/auth");
router.use(isLoginAdmin);
// end session

/* index. */
router.get("/", index);
// create
router.get("/create", viewCreate);
router.post("/create", actionCreate);
// edit
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
// update status
router.put("/status/:id", actionStatus);
// delete
router.delete("/delete/:id", actionDelete);

module.exports = router;
