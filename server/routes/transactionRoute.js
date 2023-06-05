const express = require("express");
const jobController = require("../controllers/jobController");
const { authEmployer, authUser } = require("../middleware/auth");
const DepositController = require("../controllers/depositController");
const router = express.Router();

router.post("/user/withdraw", authUser, jobController.withdrawUser);
router.post("/employer/salary", authEmployer, jobController.payUser);
router.post("/employer/topup", authEmployer, jobController.topupEmployer);

router.get("/user/balance", authUser, DepositController.userBalance);
router.get(
  "/employer/balance",
  authEmployer,
  DepositController.employerBalance
);

router.post("/user/test", DepositController.test);

module.exports = router;
