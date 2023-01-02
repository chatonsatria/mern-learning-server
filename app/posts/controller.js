const Post = require("./model");
const Users = require("../users/model");
const Category = require("../category/model");

module.exports = {
  index: async (req, res) => {
    try {
      // alert flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const user = await Users.findOne({ _id: req.session.user.user_id });
      // set post show based on user role
      if (user.role === "admin") {
        const posts = await Post.find().populate("user").populate("category");
        res.render("admin/post", {
          title: "Posts",
          posts,
          alert,
          user_role: user.role,
        });
      } else if (user.role === "user") {
        const posts = await Post.find({
          user: user._id,
        })
          .populate("user")
          .populate("category");
        res.render("admin/post", {
          title: "Post",
          posts,
          alert,
          user_role: user.role,
        });
      }
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/post");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const categoryOptions = await Category.find();
      res.render("admin/post/create", {
        title: "Create Post",
        categoryOptions,
      });
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/post");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { title, post_content, category } = req.body;
      const post = await Post.create({
        user: req.session.user.user_id,
        title,
        post_content,
        category,
      });
      post.save();
      // alert flash
      req.flash("alertMessage", `Post ${title} succesfully created`);
      req.flash("alertStatus", "success");
      res.redirect("/post");
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/post");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const categoryOptions = await Category.find();
      const post = await Post.findOne({ _id: id });
      res.render("admin/post/edit", {
        title: "Edit Post",
        post,
        categoryOptions,
      });
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/post");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, post_content, category } = req.body;
      const post = await Post.findOneAndUpdate(
        { _id: id },
        {
          user: req.session.user.user_id,
          title,
          post_content,
          category,
        }
      );
      post.save();
      // alert flash
      req.flash("alertMessage", `Post ${title} succesfully edited`);
      req.flash("alertStatus", "success");
      res.redirect("/post");
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/post");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { btnAccept, btnDeclined } = req.body;
      const post = await Post.findOne({ _id: id });
      if (post.status === "2") {
        let status = btnAccept ? btnAccept : btnDeclined;
        await Post.findOneAndUpdate({ _id: id }, { status });
      } else {
        let status = post.status === "0" ? "1" : "0";
        await Post.findOneAndUpdate({ _id: id }, { status });
      }
      // alert flash
      req.flash("alertMessage", `Post status succesfully updated`);
      req.flash("alertStatus", "success");
      res.redirect("/post");
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/post");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Post.findOneAndRemove({ _id: id });
      res.redirect("/post");
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/post");
    }
  },
};
