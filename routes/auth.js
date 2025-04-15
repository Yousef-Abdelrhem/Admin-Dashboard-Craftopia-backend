require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User, validateRegister, validateLogin } = require("../models/users.js");

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400).send(error);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("user not found");
  }

  const PassExist = await bcrypt.compare(req.body.password, user.password);
  if (!PassExist) {
    return res.send("Email or Password is Wrong");
  }

  const UserDetails = { username: user.username, email: user.email };
  const accessToken = jwt.sign(UserDetails, process.env.JWT_SECRET);
  res.send({ accessToken: accessToken });
});

router.post("/register", async (req, res) => {
  const { error } = await validateRegister(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    res.status(409).send("Email Already Exist");
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    user = await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
