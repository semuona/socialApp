const express = require("express");
const router = express.Router();

const multer = require("multer");
const uploadSimple = multer({ dest: "./server/uploads" });

const postController = require("../controllers/postController");
router.get("/listPosts", postController.listPosts);
router.post("/addPost", uploadSimple.single("image"), postController.addPost);
router.put("/likeadd/:postid/:userid", postController.addLike);

module.exports = router;
