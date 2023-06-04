require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", route);

module.exports = app;
