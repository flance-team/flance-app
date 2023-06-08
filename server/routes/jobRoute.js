const express = require("express");
const jobController = require("../controllers/jobController");
const { authEmployer, authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/", jobController.getAllJobs);
////EMPLOYER END POINTS
router.post("/", authEmployer, jobController.createJob); //buat lowongan
router.get("/list/", authEmployer, jobController.listJob); //list lowongan aktif yg dibuat oleh employer tsb
router.get("/list-applier/:id", authEmployer, jobController.listApplier); //list user yang apply di lowongan yg dibuat employer
router.get("/list-employee", authEmployer, jobController.listEmployee); //list user yg sudah bekerja di lowongan yg dibuat employer
router.patch("/offer/:id", authEmployer, jobController.acceptApply); // proses accept pelamar kerja
router.patch("/reject/:id", authEmployer, jobController.rejectApply); // proses reject pelamar kerja
router.get("/schedules-job/:id", authEmployer, jobController.getSchedules); // menampilkan schedule dari job
router.patch("/terminate-job/:id", authEmployer, jobController.terminateJob); //terminate job

////USER END POINTS

router.get("/home", authUser, jobController.getAllJobsUser); //list job di home yg sesuai dengan user skills, lokasi, etc
router.get("/list-apply/", authUser, jobController.listApplyJob); //list lowongan yang sudah diapply oleh user
router.post("/apply/:id", authUser, jobController.applyJob); //apply lowongan
router.patch("/accept/:id", authUser, jobController.acceptJob); //accept offer dari employer ktika apply jobnya disetujui oleh employer
router.patch("/reject-user/:id", authUser, jobController.rejectJob); // reject offer dari user ktika apply jobnya disetujui oleh employer
router.get("/schedules/:id", authUser, jobController.getSchedules); // menampilkan schedule dari job
router.get("/contract/:id", authUser, jobController.getContract); //menampilkan contact dari user berdasarkan joblist id

module.exports = router;
