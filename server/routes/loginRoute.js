const express = require("express");
const LoginController = require("../controllers/loginController");
const router = express.Router();

router.get("/", LoginController.login);

module.exports = router;
