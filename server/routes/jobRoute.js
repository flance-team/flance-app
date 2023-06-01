const express = require("express");
const jobController = require("../controllers/jobController");
const { authEmployer, authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", jobController.getAllJobs);
////EMPLOYER END POINTS
router.post("/", authEmployer, jobController.createJob);
router.get("/list/", authEmployer, jobController.listJob);
router.get("/list-applier/:id", authEmployer, jobController.listApplier);
router.patch("/offer/:id", authEmployer, jobController.acceptApply);
////USER END POINTS
router.get("/list-apply/", authUser, jobController.listApplyJob);
router.post("/apply/:id", authUser, jobController.applyJob);
router.patch("/accept/:id", authUser, jobController.acceptJob);
router.get("/schedules/:id", authUser, jobController.getSchedules);

module.exports = router;
