const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/auth");

router.post("/posts", auth, postCtrl.createPost);
router.get("/posts", auth, postCtrl.getPost);

module.exports = router;
