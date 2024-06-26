const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateJwt");
const emailVerifcation = require("../utils/EmailVerification");


async function UserLogin(req, res, next) {
  const { isEmail, pk, password } = req.body;
  const role = req.userRole || 'default-user';

  try {
    let user;

    if (isEmail == true) user = await User.findOne({ email: pk });
    else user = await User.findOne({ username: pk });

    if (!user) throw new Error("Unregistered Email/Username , Try SignUp");

    if(role == 'admin-user' && user.role !== 'admin-user')
      throw new Error("Unauthorized Login : Denied Admin login to this account");

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) throw new Error("Incorrect Password");

    if (user.verificationToken !== 0)
      throw new Error("Please Verify your account first before loggin In");

    const token = await generateToken({ userId: user._id }, "3d");
    if (!token.success) throw new Error(token.message);

    res.status(200).json({
      token: token.token,
      user
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}



async function UserSignup(req, res, next) {
  const { username, email, password } = req.body;
  const role = req.userRole || 'default-user';
  try {
    const checkUsername = await User.findOne({ username });
    if (checkUsername)
      throw Error("Username Already Exists, Try something different");

    const checkEmail = await User.findOne({ email });
    if (checkEmail) throw Error("Account Already Exists, Try Logging In");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username : username.toLowerCase(),
      email,
      password: hashedPassword,
      role
    });
    const token = await generateToken({ userId: user._id }, "3d");

    const { status, updatedUser } = await emailVerifcation(user);
    if (!status || !updatedUser) {
      throw new Error("Unable to send verification code to " + email);
    }
    res.status(200).json({
      token: token.token,
      user: updatedUser
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

async function OTPVerification(req, res, next) {
  const otp = req.body.otp;
  const _id = req.user.id;
  try {
    const user = await User.findOne({ _id });
    const verify = user.verificationToken == otp;

    if (!verify) {
      throw new Error("Wrong OTP");
    } else {
      user.verificationToken = 0;
      await user.save();
      res.status(200).json({ user });
    }
  } catch (error) {
    next(error)
  }
}



module.exports = {
  UserLogin,
  UserSignup,
  OTPVerification,
};
