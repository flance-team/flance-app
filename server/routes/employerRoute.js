const express = require("express");
const EmployerController = require("../controllers/employerController");
const router = express.Router();

router.post("/", EmployerController.registerEmployer);

module.exports = router;
