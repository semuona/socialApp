const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
router.get("/listPosts", postController.listPosts);
router.post("/addPost", postController.addPost);

module.exports = router;
