const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  age: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  work: {
    type: String,
  },
  bio: {
    type: String,
  },
  verificationToken : {
    type : Number
  },
  
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
