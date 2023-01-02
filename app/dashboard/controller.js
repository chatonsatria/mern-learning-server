module.exports = {
  index: async (req, res) => {
    try {
      console.log("name", req.session);
      res.render("admin/dashboard", {
        username: req.session.user.username,
        title: "Dashboard",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
