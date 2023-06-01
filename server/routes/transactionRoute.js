const express = require("express");
const jobController = require("../controllers/jobController");
const router = express.Router();

router.post("/user", jobController.payUser);
router.post("/employer", jobController.payEmployer);


module.exports = router;