require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users.js");
const auth = require("./routes/auth.js");
const authToken = require("./middleware/auth.js");

mongoose
  .connect("mongodb://localhost/taskManger")
  .then(() => {
    console.log("mongoose taskManger is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/users", authToken, users);
app.use("/auth", auth);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
