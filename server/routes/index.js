const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const jobRoute = require("./job");

router.use("/user", userRoute);
router.use("/job", jobRoute);

module.exports = router;
