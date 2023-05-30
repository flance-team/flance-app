const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const jobRoute = require("./job");
const employerRoute = require("./employer");

router.use("/user", userRoute);
router.use("/job", jobRoute);
router.use("/employer", employerRoute);

module.exports = router;
