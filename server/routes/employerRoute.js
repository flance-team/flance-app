const express = require("express");
const EmployerController = require("../controllers/employerController");
const router = express.Router();

router.post("/", EmployerController.registerEmployer);
router.get("/", EmployerController.getEmployer);

module.exports = router;
