const express = require("express");
const router = express.Router();

const multer = require("multer");
const uploadSimple = multer({ dest: "./server/uploads" });

const userController = require("../controllers/userController");
router.get("/list", userController.listUsers);
router.post("/register", userController.registerUser);
router.patch(
  "/profile",
  uploadSimple.single("image"),
  userController.addProfilePhoto
);
router.delete("/delete", userController.deleteUser);
router.post("/login", userController.loginUser);
router.put("/addfollow/:userid/:loggedInUser", userController.addFollower);

module.exports = router;
