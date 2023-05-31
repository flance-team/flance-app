const express = require("express");
const AdminController = require("../controllers/adminController");
const { authAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/", AdminController.registerAdmin);
router.post("/login", AdminController.adminLogin);

router.post("/addcategory", authAdmin, AdminController.createCategory);
router.put("/editcategory/:id", authAdmin, AdminController.editCategory);
router.delete("/deletecategory/:id", authAdmin, AdminController.deleteCategory);
module.exports = router;