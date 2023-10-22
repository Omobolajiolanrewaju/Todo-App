const express = require('express');
const controller = require("./controller");
const middleware = require("../users/users.middleware");
const authMiddleware = require("../middleware/authMiddleware");
const cookieParser = require('cookie-parser');

const appRouter = express.Router();

appRouter.use(cookieParser());

appRouter.get("/signup", controller.signUpHandler);

appRouter.get("/login", controller.loginHandler);

appRouter.get("/", controller.homePageHandler);

appRouter.get("/user/login", controller.loginHandler);

appRouter.get("/todo", authMiddleware.requireAuth, controller.todoPageHandler);

appRouter.post("/add/todo", controller.todoHandler);

appRouter.get("/delete/todo/:_id", controller.deleteTodo)

module.exports = appRouter;