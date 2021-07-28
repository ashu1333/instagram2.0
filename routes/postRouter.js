const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/auth");

router.post("/posts", auth, postCtrl.createPost);
router.get("/posts", auth, postCtrl.getPost);
router.patch("/post/:id", auth, postCtrl.updatePost);
router.patch("/post/:id/like", auth, postCtrl.likePost);
router.patch("/post/:id/unlike", auth, postCtrl.unlikePost);
router.get("/post_discover", auth, postCtrl.getPostsDicover);
// router.delete("/post/:id", auth, postCtrl.deletePost);
module.exports = router;
