const joi = require("joi");

const loginValidator = joi.object({
  isEmail : joi.bool().required(),
  pk: joi.string().required(),
  // password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  password: joi.string().required()
})

const signupValidator = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  // password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  password: joi.string().required()
})

const VerifyOtp = joi.object({
  otp : joi.number().required()
})

module.exports = {
  loginValidator,
  signupValidator,
  VerifyOtp
}