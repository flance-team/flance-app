const express = require("express");
const { authEmployer, authUser } = require("../middleware/auth");
const DepositController = require("../controllers/depositController");
const router = express.Router();

router.get("/employer/balance", authEmployer, DepositController.employerBalance);
router.post("/employer/topup", authEmployer, DepositController.topupEmployer);
router.post("/employer/salary", authEmployer, DepositController.payUser);

router.get("/user/balance", authUser, DepositController.userBalance);
router.post("/user/withdraw", authUser, DepositController.withdrawUser);

module.exports = router;
