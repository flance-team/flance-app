const express = require("express");
const jobController = require("../controllers/jobController");
const router = express.Router();

router.get("/", jobController.getAllJobs);
////EMPLOYER END POINTS
router.post("/", jobController.createJob);
router.post("/offer/:id", jobController.acceptApply);
////USER END POINTS
router.post("/apply/:id", jobController.applyJob);
router.post("/accept/:id", jobController.acceptJob);

module.exports = router;
