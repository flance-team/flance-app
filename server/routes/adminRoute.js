const express = require("express");
const AdminController = require("../controllers/adminController");
const router = express.Router();

router.post("/", AdminController.registerAdmin);
router.post("/login", AdminController.adminLogin);

module.exports = router;
