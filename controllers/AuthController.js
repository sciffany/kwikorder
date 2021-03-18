const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });

exports.signup = async (req, res, next) => {
  try {
    let user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = createToken(user._id);

    await user.save();
    res.status(200).json({ token, data: user });
  } catch (err) {
    res.send(err.toString());
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send('Please provide email or password');
  }

  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user) {
    res.send('Email is incorrect');
  }
  const correct = await user.correctPassword(password, user.password);

  if (!correct) {
    res.status(401).send('Password is incorrect');
  }
  const token = createToken(user._id);
  res.status(200).json({ token });
};
