const express = require("express");
const jobController = require("../controllers/jobController");
const { authEmployer, authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/user/withdraw", authUser, jobController.withdrawUser);
router.post("/employer/salary", authEmployer, jobController.payUser);
router.post("/employer/topup", authEmployer, jobController.topupEmployer);


module.exports = router;