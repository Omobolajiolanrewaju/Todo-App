const joi = require("joi");
const logger = require('../logger');

const validateUserCreation = async (req, res, next) => {
  try {
    const schema = joi.object({
      name: joi.string().min(1).required(),
      password: joi.string().required(),
      email: joi.string().email().required(),
      username: joi.string().min(1).required(),
      gender: joi.string().valid('male', 'female').required(),
    })

    await schema.validateAsync(req.body, { abortEarly: true})

    next();
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      message: error.message,
      success: false
    })
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })

    await schema.validateAsync(req.body, { abortEarly: true})

    next();
  } catch (error) {
    
    return res.status(422).json({
      message: error.message,
      success: false
    })
  }
};

module.exports = {
  validateUserCreation,
  loginValidation,
};