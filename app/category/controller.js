const Category = require("./model");
// for image upload
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      // alert flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const category = await Category.find();
      res.render("admin/category", { title: "Categories", category, alert });
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", { title: "Create Category" });
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionCreate: async (req, res) => {
    // create cara sesi pertama icon
    // try {
    //   const { name, icon } = req.body;
    //   const category = await Category.create({ name, icon });
    //   category.save();
    //   req.flash("alertMessage", `Category "${name}" succesfully created`);
    //   req.flash("alertStatus", "success");
    //   res.redirect("/category");
    // } catch (err) {
    //   // alert flash
    //   req.flash("alertMessage", `${err.message}`);
    //   req.flash("alertStatus", "danger");
    //   res.redirect("/category");
    // }
    // create cara sesi kedua
    try {
      const { name } = req.body;
      // for upload icon
      if (req.file) {
        let temp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        const src = fs.createReadStream(temp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const category = new Category({
              name,
              icon: filename,
            });
            await category.save();
            req.flash("alertMessage", `${name} category succesfully created`);
            req.flash("alertStatus", "success");
            res.redirect("/category");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/category");
          }
        });
      } else {
        const category = new Category({
          name,
        });
        await category.save();
        res.redirect("/category");
      }
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      res.render("admin/category/edit", { title: "Edit Category", category });
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionEdit: async (req, res) => {
    // create cara sesi pertama
    // try {
    //   const { id } = req.params;
    //   const { name } = req.body;
    //   const category = await Category.findOneAndUpdate({ _id: id }, { name });
    //   await category.save();
    //   req.flash("alertMessage", `Category succesfully edited to ${name} `);
    //   req.flash("alertStatus", "success");
    //   res.redirect("/category");
    // } catch (err) {
    //   // alert flash
    //   req.flash("alertMessage", `${err.message}`);
    //   req.flash("alertStatus", "danger");
    //   res.redirect("/category");
    // }

    // create cara sesi kedua
    try {
      const { id } = req.params;
      const { name } = req.body;
      // if image exist
      if (req.file) {
        let temp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        const src = fs.createReadStream(temp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            // get category data
            const category = await Category.findOne({ _id: id });
            // set current image for checking
            if (category.icon) {
              let currentImage = `${config.rootPath}/public/uploads/${category.icon}`;
              // delete image on public
              fs.unlinkSync(currentImage);
            }
            // find and update on image upload
            await Category.findOneAndUpdate(
              { _id: id },
              {
                name,
                icon: filename,
              }
            );
            // alert flash
            req.flash("alertMessage", `${name} category succesfully created`);
            req.flash("alertStatus", "success");
            res.redirect("/category");
          } catch (err) {
            // alert flash
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/category");
          }
        });
      } else {
        await Category.findOneAndUpdate(
          { _id: id },
          {
            name,
          }
        );
        res.redirect("/category");
      }
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionDeleteImage: async (req, res) => {
    console.log("delete image jalan");
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      if (category.icon || fs.existsSync) {
        let currentImage = `${config.rootPath}/public/uploads/${category.icon}`;
        fs.unlinkSync(currentImage);
      }
      await Category.findOneAndUpdate({ _id: id }, { icon: "" });
      res.redirect(`/category/edit/${id}`);
    } catch (err) {}
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      // get category data
      const category = await Category.findOne({ _id: id });
      // del current if exist
      if (category.icon) {
        let currentImage = `${config.rootPath}/public/uploads/${category.icon}`;
        // delete image on public
        fs.unlinkSync(currentImage);
      }
      await Category.findOneAndRemove({ _id: id });
      // alert flash
      req.flash("alertMessage", `Berhasil hapus category`);
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};

// for unlink or remove image in public (from course)
// if (fs.existsSync(currentImage)) {
// fs.unlinkSync(currentImage);
// }
