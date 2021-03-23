const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const rolesMiddleware = async (req, res, next) => {
  console.log('Hello from the middleware!👋');

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next();
  const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!id) return next();
  const user = await User.findOne({ _id: id });
  if (!user) return next();
  req.role = user.role;

  console.log(req.role);
  return next();
};

module.exports = rolesMiddleware;
