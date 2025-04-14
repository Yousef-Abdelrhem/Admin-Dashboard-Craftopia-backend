const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require('./routes/users.js');
const auth = require('./routes/auth.js');

mongoose
  .connect("mongodb://localhost/taskManger")
  .then(() => {
    console.log("mongoose taskManger is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use('/users', users);
app.use('/auth', auth);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening to port", PORT);
});

// **Authentication Flow:**

//- User can create an account with name, email, and password.
// route for user
// connect to mongoose and create date base for the users
// - User can login to view their projects and associated tasks.
