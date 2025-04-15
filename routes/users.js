const express = require("express");
const mongoose = require("mongoose");
const { User, validateUser } = "../models/users.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send('every thing works fine i guess');
});

module.exports = router;
