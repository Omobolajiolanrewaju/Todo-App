const jwt = require('jsonwebtoken');
const logger = require('../logger');
const controller = require("../users/users-controller");

require('dotenv').config();

const requireAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    return res.redirect('/login');
                }
            else{
                next();
            }
        })   
    }
    else{
        res.redirect('/login')
    }
    } catch (error) {
        logger.error(error.message) 
        return res.status(500).json({
        message: 'Server Error',
        data: null
    })
    }
}

module.exports = {
    requireAuth
}