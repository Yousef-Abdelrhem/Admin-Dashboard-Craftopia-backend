const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();
const { User, validateUser } = "../models/users.js";

const usersData = [];

router.post("/login", async (req, res) => {
  const user = User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("user not found");
  if (bcrypt.compare(password, user.password)) {
    return res.send("email or password is wrong");
  }

  res.send("correct user");
});

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash(req.body.password, salt);
  usersData.push({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  User.insertOne({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  User.save();
});

module.exports = router;
