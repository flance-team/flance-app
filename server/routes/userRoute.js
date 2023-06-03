const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/", UserController.registerUser);
router.get("/", UserController.getUser);
router.get("/:id", UserController.getUserById);
router.get("/skills", UserController.getSkills);
router.post("/skills", UserController.addSkills);

module.exports = router;
