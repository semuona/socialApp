const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
router.get("/list", userController.listUsers);
router.post("/register", userController.registerUser);
router.delete("/delete", userController.deleteUser);
router.post("/login", userController.loginUser)

module.exports = router;
