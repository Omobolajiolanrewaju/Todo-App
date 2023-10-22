const db = require("../users/users-db");
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

const checkBody = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      data: null,
      message: "Must have a body.",
    });
  }
};

const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }

  const auth = new Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  const username = auth[0].toString().toUpperCase();
  const password = auth[1];

  const existingUser = db.users.find(
    (user) =>
      user.username.toUpperCase() === username && user.password === password
  );

  if (existingUser) {
    req.user = existingUser;
    next();
  } else {
    return res.status(401).json({ message: "You are not authenticated" });
  }
};

const apiKeyAuth = (req, res, next) => {
  const authHeader = req.headers.api_key;

  if (!authHeader) {
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }

  const existingUser = db.users.find((user) => user.api_key === authHeader);

  if (existingUser) {
    req.user = existingUser;

    next();
  } else {
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }
};

const bearerTokenAuth = async (req, res, next) => {

  try {
  const authHeader = req.headers;

  if (!authHeader.authorization) {
    return res.status(401).json({ message: 'You are not authenticated'})
  };

  const token = authHeader.authorization.split(' ')[1]; // Bearer token value

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // decoded { email: user@example.com, _id: odjeofjwoe }
  const user = await UserModel.findOne({ _id: decoded._id} )

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  req.user = user;
  next();

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }
}

const adminAuth = (req, res, next) => {
  if (req.user.user_type === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "You are not authenticated",
    });
  }
};

module.exports = {
  checkBody,
  basicAuth,
  apiKeyAuth,
  adminAuth,
  bearerTokenAuth
};