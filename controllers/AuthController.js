const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });

exports.signup = async (req, res) => {
  try {
    let user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    const token = createToken(user._id);

    await user.save();
    console.log(user);
    res.status(200).json({ token, data: user });
  } catch (err) {
    res.send(err.toString());
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send('Please provide email or password');
  }

  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user) {
    res.status(401).send('Email is incorrect');
  }
  const correct = await user.correctPassword(password, user.password);
  console.log('correct', correct);
  if (!correct) {
    res.status(401).send('Password is incorrect');
  }
  const token = createToken(user._id);
  res.status(200).json({ token });
};

exports.protect = async (req, res, next) => {
  try {
    // Get token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).send('Not logged in!');
      return;
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(402).send('Token is not authentic');
    }

    // Check if user still exists
    // User changed password after
  } catch (err) {
    res.send(err.toString());
  }
  next();
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.role)) {
      next();
    } else {
      res.status(403).send('Not authorised');
    }
  };
};
