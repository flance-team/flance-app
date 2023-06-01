const express = require("express");
const jobController = require("../controllers/jobController");
const { authEmployer, authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", jobController.getAllJobs);
////EMPLOYER END POINTS
router.post("/", authEmployer, jobController.createJob);
router.post("/offer/:id", authEmployer, jobController.acceptApply);
////USER END POINTS
router.post("/apply/:id", authUser, jobController.applyJob);
router.post("/accept/:id", authUser, jobController.acceptJob);

module.exports = router;
