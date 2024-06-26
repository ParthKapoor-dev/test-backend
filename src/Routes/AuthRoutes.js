const express = require("express");
const { UserLogin, UserSignup, OTPVerification } = require("../Controllers/authController");
const validate = require("../Middleware/validatorMiddleware")
const { loginValidator, signupValidator, VerifyOtp } = require("../Validators/authValidators");
const verfiyToken = require("../Middleware/verifyToken");
const AuthRouter = express.Router();

AuthRouter.post("/login", validate(loginValidator), UserLogin);
AuthRouter.post("/signup", validate(signupValidator), UserSignup);
AuthRouter.post("/verify-otp", validate(VerifyOtp), verfiyToken, OTPVerification);

module.exports = AuthRouter;