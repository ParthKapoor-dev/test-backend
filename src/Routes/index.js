const express = require("express");
const AuthRouter = require("./AuthRoutes");
const verfiyToken = require("../Middleware/verifyToken");
const UserRouter = require("./UserRoutes");
const AppRouter = express.Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/user", verfiyToken, UserRouter);

module.exports = AppRouter;
