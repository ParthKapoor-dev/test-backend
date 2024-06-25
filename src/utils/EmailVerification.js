const nodemailer = require("nodemailer");

function generateCode() {
  const code = Math.floor(Math.random() * 1000);
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
    const code = generateCode();
    console.log(code);

    const mailOptions = {
      from: process.env.GMAIL_EMAIL_ID,
      to: user.email,
      subject: "Backend Test Verification Code",
      text: `Verification code is ${code}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

module.exports = emailVerifcation;
