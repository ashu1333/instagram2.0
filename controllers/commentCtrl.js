const Comment = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentCrtl = {
  createComment: async (req, res) => {
    try {
      console.log(req.body);
      const { postId, content, tag, reply, like } = req.body;

      const post = await Posts.findById(postId);
      if (!post)
        return res.status(400).json({ msg: "This post does not exist" });

      const newComment = new Comment({
        user: req.user._id,
        content,
        tag,
        reply,
        like,
      });
      console.log(newComment);
      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();
      res.json({ newComment });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },
};

module.exports = commentCrtl;
