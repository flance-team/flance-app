const express = require("express");
const jobController = require("../controllers/jobController");
const router = express.Router();

router.get("/", jobController.getAllJobs);
router.post("/", jobController.createJob);

module.exports = router;