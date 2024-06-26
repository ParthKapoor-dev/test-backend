const joi = require("joi");

const ProfileValidator = joi.object({
  location : joi.string(),
  age : joi.number(),
  dob : joi.date(),
  work : joi.string(),
  bio : joi.string()
})


module.exports = {
  ProfileValidator
}