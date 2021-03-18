const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res, next) => {
  try {
    let user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });

    await user.save();
    res.status(200).json({ token, data: user });
  } catch (err) {
    res.send(err.toString());
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body.email;
  if (!email || !password) {
    res.send('Please provide email or password');
  }
};
