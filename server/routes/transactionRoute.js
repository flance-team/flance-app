const express = require("express");
const { authEmployer, authUser } = require("../middleware/auth");
const DepositController = require("../controllers/depositController");
const router = express.Router();

router.post("/user/withdraw", authUser, DepositController.withdrawUser);
router.post("/employer/salary", authEmployer, DepositController.payUser);
router.post("/employer/topup", authEmployer, DepositController.topupEmployer);

router.get("/user/balance", authUser, DepositController.userBalance);
router.get(
  "/employer/balance",
  authEmployer,
  DepositController.employerBalance
);

router.post("/user/test", DepositController.test);

module.exports = router;
