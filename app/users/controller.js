const Users = require("./model");
const bcrypt = require("bcryptjs");

module.exports = {
  viewLogin: async (req, res) => {
    try {
      // alert flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/users/login", {
          title: "Admin Login",
          alert,
        });
      } else {
        res.redirect("/dashboard");
      }
    } catch (err) {
      // alert flash
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/login");
    }
  },
  actionLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await Users.findOne({ email: email });
      if (check) {
        if (check.status === "Y") {
          const checkPassword = password === check.password;
          // bcrypt
          // const checkPassword = bcrypt.compare(password, check.password);
          if (checkPassword) {
            req.session.user = {
              user_id: check._id,
              email: check.email,
              status: check.status,
              username: check.username,
            };
            res.redirect("/dashboard");
          } else {
            req.flash("alertMessage", `kata sandi salah`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        }
      } else {
        req.flash("alertMessage", `email tidak di temukan`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (err) {
      req.flash("alertMessage", `internal server error`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionLogout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
