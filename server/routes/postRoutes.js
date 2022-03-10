const express = require("express");
const router = express.Router();

const multer = require("multer");
const uploadSimple = multer({ dest: "./server/uploads" });

const postController = require("../controllers/postController");
router.get("/listPosts", postController.listPosts);
router.post("/addPost", uploadSimple.single("image"), postController.addPost);

module.exports = router;
