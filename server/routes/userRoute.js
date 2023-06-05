const express = require("express");
const UserController = require("../controllers/userController");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/", UserController.registerUser);
router.get("/", UserController.getUser);
router.get("/skills", UserController.getSkills);
router.post("/skills", authUser, UserController.addSkills);
router.get("/:id", UserController.getUserById);

module.exports = router;
