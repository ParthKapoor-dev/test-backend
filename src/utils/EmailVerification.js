const nodemailer = require("nodemailer");
const User = require("../Models/UserModel");

function generateCode() {
  const code = Math.floor(1000 + Math.random() * 9000);
  if (code == 0) return generateCode();
  return code;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});

async function emailVerifcation(user) {
  try {
    const token = generateCode();

    const updatedUser = await User.findOne({ email: user.email });
    updatedUser.verificationToken = token;
    await updatedUser.save();

    const mailOptions = {
      from: process.env.GMAIL_EMAIL_ID,
      to: user.email,
      subject: "Backend Test Verification Code",
      text: `Verification token is ${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return { status: true, updatedUser };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

module.exports = emailVerifcation;
