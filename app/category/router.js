var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  actionDeleteImage,
} = require("./controller");
// multer for image upload
const multer = require("multer");
// os - image upload
const os = require("os");
// session
const { isLoginAdmin } = require("../middleware/auth");
router.use(isLoginAdmin);
/* index */
router.get("/", index);
// create
router.get("/create", viewCreate);
// setup upload image multer name "image" based on input name inside form
router.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("icon"),
  actionCreate
);
// edit
router.get("/edit/:id", viewEdit);
router.put(
  "/edit/:id",
  multer({ dest: os.tmpdir() }).single("icon"),
  actionEdit
);
// delete image on edit
router.put("/delete-image/:id", actionDeleteImage);
// delete
router.delete("/delete/:id", actionDelete);

module.exports = router;
