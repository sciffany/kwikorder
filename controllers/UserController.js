const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    let user = new User(req.body);
    user = await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.read = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};

exports.update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(400).send('User not found');
    } else {
      res.status(200).send(updatedUser);
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
};
