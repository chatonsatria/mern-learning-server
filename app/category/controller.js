const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      // alert flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const category = await Category.find();
      res.render("admin/category", { title: "Category", category, alert });
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      let category = await Category.create({ name });
      await category.save();

      req.flash("alertMessage", `${name} category succesfully created`);
      req.flash("alertStatus", "success");
      res.redirect("/category");
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
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findOneAndUpdate({ _id: id }, { name });
      await category.save();
      req.flash("alertMessage", `Category succesfully edited to ${name} `);
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOneAndRemove({ _id: id });
      res.redirect("/category");
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};
