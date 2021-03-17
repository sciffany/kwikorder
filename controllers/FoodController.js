const Food = require('../models/Food');

exports.create = async (req, res) => {
  try {
    let food = new Food(req.body);
    food = await food.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.read = async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};

exports.update = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(400).send('Food not found');
    } else {
      res.status(200).send(updatedUser);
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.delete = async (req, res) => {
  try {
    const food = await Food.findByIdAndRemove({
      _id: req.params.id,
    });
    if (!food) {
      res.status(404).json('Note not found');
    } else {
      res.status(200).json('Note deleted successfully');
    }
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

exports.readAll = async (req, res) => {
  try {
    const food = await Food.find({ category: req.query.category });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};
