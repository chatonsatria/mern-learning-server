const Player = require("./model");
const Posts = require("../posts/model");

module.exports = {
  posts: async (req, res) => {
    try {
      // example from course
      //   const posts = await Posts.find()
      //     .populate("user")
      //     .select("_id title user category")
      //     .populate("category", _id name);
      //   res.status(200).json({ data: posts });

      const posts = await Posts.find().populate("user").populate("category");
      const resData = posts.map((post) => {
        return {
          post_id: post._id,
          author_name: post.user.username,
          category:
            post.category.length > 0
              ? post.category.map((category) => {
                  return {
                    id: category._id,
                    name: category.name,
                  };
                })
              : null,
        };
      });
      res.status(200).json({ data: resData });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
