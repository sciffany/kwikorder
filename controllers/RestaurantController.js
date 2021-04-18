const Restaurant = require('../models/Restaurant');

exports.create = async (req, res) => {
  try {
    let restaurant = new Restaurant(
      Object.assign(req.body, { owner: req.user._id })
    );
    console.log('restaurant', restaurant);
    restaurant = await restaurant.save();
    res.status(200).send(restaurant);
  } catch (err) {
    res.send(err.toString());
  }
};

exports.readAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .where('owner')
      .equals(req.user._id);

    res.status(200).json(restaurants);
  } catch (err) {
    res.status(404);
  }
};

exports.read = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id });

    res.status(200);
    res.json(restaurant);
  } catch (err) {
    res.status(404);
  }
};

exports.update = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRestaurant) {
      res.send('Not found');
    } else {
      res.status(200);
      res.send(updatedRestaurant);
    }
  } catch (err) {
    res.status(404);
  }
};

exports.delete = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndRemove({
      _id: req.params.id,
    });
    if (!restaurant) {
      res.status(404);
      res.json('Restaurant not found');
    } else {
      res.status(200);
      res.json('Restaurant deleted successfully');
    }
  } catch (err) {
    res.status(500);
    res.json('Internal server error');
  }
};
