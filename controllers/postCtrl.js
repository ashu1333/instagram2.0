const Posts = require("../models/postModal");

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: "Please Add Your Photo" });

      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      });

      await newPost.save();

      res.json({
        msg: "Created Post !",
        newPost: {
          ...newPost._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPost: async (req, res) => {
    try {
      const posts = await Posts.find({
        user: [...req.user.following, req.user._id],
      }).populate("user likes", "avatar username fullname");
      console.log(posts);
      res.json({
        msg: "Sucess !",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postCtrl;
