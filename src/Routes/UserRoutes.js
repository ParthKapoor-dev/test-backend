const express = require("express");
const validate = require("../Middleware/validatorMiddleware");
const { setupProfile } = require("../Controllers/userController");
const { setupProfileValidator } = require("../Validators/userValidator");
const UserRouter = express.Router(); 

UserRouter.post("/setup-profile", validate(setupProfileValidator) , setupProfile );

module.exports = UserRouter;