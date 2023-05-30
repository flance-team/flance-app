const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const jobRoute = require("./jobRoute");
const employerRoute = require("./employerRoute");

router.use("/user", userRoute);
router.use("/job", jobRoute);
router.use("/employer", employerRoute);

module.exports = router;
