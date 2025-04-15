const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, require: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = new mongoose.model("User", userSchema);

// validate the register
function validateRegister(user) {
  const schema = joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().max(50).required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .required(),
  });
  return schema.validate(user);
}

// validate the login
function validateLogin(user) {
  const schema = joi.object({
    email: joi.string().email(),
    password: joi.string().max(50),
  });
  return schema.validate(user);
}
module.exports = {
  User,
  validateRegister,
  validateLogin,
};
