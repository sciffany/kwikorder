const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * This component determines the user and the role based on the bearer token presented
 * @param {*} req request
 * @param {*} res response
 * @param {*} next callback function
 * @returns
 */
const rolesMiddleware = async (req, res, next) => {
  console.log('Initialising roles middleware');

  res.header('Access-Control-Allow-Headers', 'authorization, content-type');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  );

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  try {
    const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: id });
    req.role = user.role;
    req.user = user;

    return next();
  } catch (err) {
    return next();
  }
};

module.exports = rolesMiddleware;
