const express = require("express");
const { getUsers, getUserByUsername, deleteUserByUsername } = require("../Controllers/adminController");
const validate = require("../Middleware/validatorMiddleware");
const { usernameValidator } = require("../Validators/adminValidator");
const AdminRouter = express.Router();

AdminRouter.get("/get-users", getUsers);
AdminRouter.get("/get-username/:username", getUserByUsername);
AdminRouter.delete("/delete-username", validate(usernameValidator), deleteUserByUsername)

module.exports = AdminRouter;

// admin router