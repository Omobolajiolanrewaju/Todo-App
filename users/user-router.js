const express = require("express");
const middleware = require("./users.middleware");
const controller = require("./users-controller");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const userRouter = express.Router();

userRouter.use(cookieParser());

userRouter.use(bodyParser.json());


// Create User
userRouter.post("/signup", middleware.validateUserCreation, controller.createUser);

// Login User
userRouter.post("/login", middleware.loginValidation, controller.login);

module.exports = userRouter;