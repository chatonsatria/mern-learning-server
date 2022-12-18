module.exports = {
  index: async (req, res) => {
    try {
      res.render("admin/dashboard", { title: "Dashboard" });
    } catch (err) {
      console.log(err);
    }
  },
};
