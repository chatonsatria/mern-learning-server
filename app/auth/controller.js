const Player = require("./../player/model");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const { email, name } = req.body;
    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          message: err.message,
          fields: err.errors,
        });
      }
      next();
    }
  },
};
