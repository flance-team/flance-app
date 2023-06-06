const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const jobRoute = require("./jobRoute");
const employerRoute = require("./employerRoute");
const adminRoute = require("./adminRoute");
const loginRoute = require("./loginRoute");
const transactionRoute = require("./transactionRoute");
const errorHandler = require("../middleware/errorHandler");

router.use("/users", userRoute);
router.use("/jobs", jobRoute);

// router.use((req, res, next) => {
//   console.log("CEKURL:", req.url);
//   next();
// });

router.use("/transactions", transactionRoute);
router.use("/employers", employerRoute);
router.use("/admins", adminRoute);
router.use("/login", loginRoute);

router.use(errorHandler);

module.exports = router;
