const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/", UserController.registerUser);

module.exports = router;
