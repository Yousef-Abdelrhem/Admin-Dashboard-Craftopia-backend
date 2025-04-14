const express = require("express");
const mongoose = require("mongoose");
const { User, validateUser } = "../models/users.js";
const router = express.Router();

const users = [
  { id: 1, title: "First Post", content: "This is the first post" },
  { id: 2, title: "Second Post", content: "This is the second post" },
];

router.get("/", (req, res) => {
  res.json(posts);
});

module.exports = router;
