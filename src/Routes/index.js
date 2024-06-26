const express = require("express");
const AuthRouter = require("./AuthRoutes");
const verfiyToken = require("../Middleware/verifyToken");
const UserRouter = require("./UserRoutes");
const isAdmin = require("../Middleware/isAdmin");
const AppRouter = express.Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use('/admin-auth' , isAdmin , AuthRouter);
AppRouter.use("/user", verfiyToken, UserRouter);


module.exports = AppRouter;
