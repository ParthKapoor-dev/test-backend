const express = require("express");
const AuthRouter = require("./AuthRoutes");
const verfiyToken = require("../Middleware/verifyToken");
const UserRouter = require("./UserRoutes");
const isAdmin = require("../Middleware/isAdmin");
const errorMiddleware = require("../Middleware/errorController");
const AdminRouter = require("./AdminRoutes");
const adminRole = require("../Middleware/adminRole");
const AppRouter = express.Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/user", verfiyToken, UserRouter);
AppRouter.use('/admin-auth', adminRole , AuthRouter);
AppRouter.use('/admin', verfiyToken, isAdmin, AdminRouter);

AppRouter.use(errorMiddleware);

module.exports = AppRouter;
