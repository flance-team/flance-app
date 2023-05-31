const express = require("express");
const AdminController = require("../controllers/adminController");
const { authAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/", AdminController.registerAdmin);
router.post("/login", AdminController.adminLogin);

router.post("/addcategory", authAdmin, AdminController.createCategory);
router.put("/editcategory/:id", authAdmin, AdminController.editCategory);
router.delete("/deletecategory/:id", authAdmin, AdminController.deleteCategory);

router.post("/addtype", authAdmin, AdminController.createType);
router.put("/edittype/:id", authAdmin, AdminController.editType);
router.delete("/deletetype/:id", authAdmin, AdminController.deleteType);

router.post("/addskill", authAdmin, AdminController.createSkill);
router.put("/editskill/:id", authAdmin, AdminController.editSkill);
router.delete("/deleteskill/:id", authAdmin, AdminController.deleteSkill);

router.patch("/verifyemployer/:id", authAdmin, AdminController.verifyEmployer);

module.exports = router;
