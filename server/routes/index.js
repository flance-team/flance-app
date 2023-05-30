const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const jobRoute = require("./jobRoute");
const employerRoute = require("./employerRoute");
const adminRoute = require("./adminRoute");
const loginRoute = require("./loginRoute");

router.use("/user", userRoute);
router.use("/job", jobRoute);
router.use("/employer", employerRoute);
router.use("/admin", adminRoute);
router.use("/login", loginRoute);

module.exports = router;
