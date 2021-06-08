const Posts = require("../models/postModel");

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
      })
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname");
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

  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        }
      ).populate("user like", "avatar username fullname");

      console.log("HIIIIIIIIII" + post);
      res.json({
        msg: "Post Updated",
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      console.log(post);
      if (post.length > 0)
        return res.status(400).json({ msg: "You liked this post." });
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );
      if (!like)
        return res.status(400).json({ msg: "This Post doesn`t exist" });
      res.json({ msg: "Liked post !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unlikePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      if (!like) {
        return res.status(400).json({ msg: "This post does not exist" });
      }

      res.json({ msg: "Unliked post" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postCtrl;
