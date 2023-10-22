const UserModel = require('../models/user.model'); // Connecting to MongoDB
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const logger = require('../logger');
const userService = require('./user-services');

dotenv.config()

const createUser = async (req, res, next) => {
  try {
    logger.info('[CreateUser] => signup process started')
    const userFromRequest = req.body;

    const existingUser = await UserModel.findOne({
      email: userFromRequest.email.toLowerCase()
    });

    console.log(existingUser);
  
    if (existingUser) {
      return res.status(409).json({
        message: 'User already created',
      })
    }
  
    const user = await UserModel.create({
      name: userFromRequest.name.toLowerCase(),
      password: userFromRequest.password,
      email: userFromRequest.email.toLowerCase(),
      username: userFromRequest.username.toLowerCase(),
      gender: userFromRequest.gender,
    })
  
    const token = await jwt.sign({ email: user.email, _id: user._id}, process.env.JWT_SECRET)
  
    res.status(201)
    logger.info('[CreateUser] => signup process done')
  
    return res.redirect('/user/login');
  
    // return res.status(201).json({
    //   message: "User created successfully!!!",
    //   user,
    //   token
    // });
   
  } catch (error) {
    logger.error(error.message) 
    return res.status(500).json({
      message: 'Server Error',
      data: null
    })
  }

};

const login = async (req, res, next) => {
  try {
    logger.info('[login]] => login process started')
    const userFromRequest = req.body;

  const user = await UserModel.findOne({
    email: userFromRequest.email.toLowerCase(),
  })
  
  if (!user) {
    return res.status(404).json({
      message: "User not found."
    })
  }

  const validPassword = await user.isValidPassword(userFromRequest.password)

  if (!validPassword) {
    return res.status(422).json({
      message: "Email or password is not correct."
    })
  }

  const response = await userService.Login({ email: req.body.email, password: req.body.password })

  const token = await jwt.sign({ email: user.email, _id: user._id}, process.env.JWT_SECRET, { expiresIn: '10m'})

  res.cookie('jwt', response.data.token)

  res.status(201)
  logger.info('[login] => login process done')
  
  return res.redirect('/todo')

  // return res.status(201).json({
  //   message: "Login successful",
  //   user,
  //   token
  // });

  } catch (error) {
    logger.error(error.message)    
    return res.status(500).json({
      message: 'Server Error',
      data: null
    })
  }
  
};

const token = async (req, res, next) => {
  const response = await userService.Login({ email: req.body.email, password: req.body.password })

  res.cookie('jwt', response.data.token)

  console.log(req.cookies.jwt)
  
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.redirect('/login');
      }
      else {
        next();
      }
    })
  }

  next()

  // return { data: req.cookies} ;

}


module.exports = {
  createUser,
  login,
  token
};