const Food = require('../models/Food');

/**
 * Creates a food object
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
  try {
    let food = new Food(req.body);
    food = await food.save();

    res.status(200).json(food);
  } catch (err) {
    res.send(err.toString());
  }
};

/**
 * Gets one food object
 * @param {*} req
 * @param {*} res
 */
exports.read = async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.params.id });
    res.status(200).json(food);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};

/**
 * Updates a food object
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFood) {
      res.status(400).send('Food not found');
    } else {
      res.status(200).send(updatedFood);
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

/**
 * Deletes a food object by id
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  try {
    const food = await Food.findByIdAndRemove({
      _id: req.params.id,
    });
    if (!food) {
      res.status(404).json('Food not found');
    } else {
      res.status(200).json('Food deleted successfully');
    }
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

/**
 * Gets all food objects in a restaurant
 * @param {*} req
 * @param {*} res
 */
exports.readAll = async (req, res) => {
  try {
    const foods = await Food.find()
      .where('restaurant')
      .equals(req.query.restaurant);

    res.status(200).json(foods);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};
