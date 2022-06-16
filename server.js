const express = require("express");
const app = express();
const cors = require("cors");

app.set("view engine", "ejs");
app.use(cors());

module.exports = app;