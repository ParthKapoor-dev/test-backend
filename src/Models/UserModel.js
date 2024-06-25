const { string, required } = require("joi");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique : true
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true,
  },
  role : {
    type : String,
    enum : ["default-user" , "admin-user"],
    default : "default-user",
    required : true
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
