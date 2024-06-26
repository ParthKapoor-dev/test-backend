const express = require("express");
const validate = require("../Middleware/validatorMiddleware");
const { setupProfile , getProfile, updateProfile } = require("../Controllers/userController");
const { ProfileValidator } = require("../Validators/userValidator");
const UserRouter = express.Router(); 

UserRouter.post("/setup-profile", validate(ProfileValidator) , setupProfile );
UserRouter.get("/get-profile" , getProfile);
UserRouter.put("/update-profile" , validate(ProfileValidator) , updateProfile);

module.exports = UserRouter;