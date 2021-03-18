const Cart = require('../models/Cart');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
  try {
    let cart = new Cart(req.body);
    cart = await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.send(err.toString());
  }
};

exports.read = async (req, res) => {
  try {
    const cart = await Cart.findOne({ _id: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};

exports.addFood = async (req, res) => {
  try {
    const { food, quantity } = req.body;
    let cart = await Cart.findOne({ _id: req.body.id });

    if (!food || !quantity) {
      res.end('Food or quantity missing');
    } else {
      // Merge food orders if same food
      let foodPreviouslyOrdered = false;
      cart.orders.forEach((order) => {
        if (order.food.toString() === food) {
          foodPreviouslyOrdered = true;
          order.quantity += parseInt(quantity);
        }
      });

      // Add to cart
      if (!foodPreviouslyOrdered) {
        cart.orders.push({ food, quantity });
      }

      await cart.save();
      res.status(200).send(cart);
    }
  } catch (err) {
    res.send(err.toString());
  }
};

exports.update = async (req, res) => {
  try {
    const updatedCart = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCart) {
      res.status(400).send('Food not found');
    } else {
      res.status(200).send(updatedCart);
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.delete = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndRemove({
      _id: req.params.id,
    });
    if (!cart) {
      res.status(404).json('Cart not found');
    } else {
      res.status(200).json('Cart deleted successfully');
    }
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

exports.readAll = async (req, res) => {
  try {
    const cart = await Cart.find().where('category').equals(req.query.category);

    res.status(200).json(cart);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { food, quantity } = req.body;
    let cart = await Cart.findOne({ _id: req.body.id });

    if (!food || !quantity) {
      res.end('Food or quantity missing');
    } else {
      cart.orders.forEach((order) => {
        if (order.food.toString() === food) {
          order.quantity = parseInt(quantity);
        }
      });

      await cart.save();
      res.status(200).send(cart);
    }
  } catch (err) {
    res.send(err.toString());
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { status } = req.body;
    let cart = await Cart.findOne({ _id: req.body.id });

    if (!food || !quantity) {
      res.end('Food or quantity missing');
    } else {
      cart.orders.forEach((order) => {
        if (order.food.toString() === food) {
          order.quantity = parseInt(quantity);
        }
      });

      await cart.save();
      res.status(200).send(cart);
    }
  } catch (err) {
    res.send(err.toString());
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let cart = await Cart.findOne({ _id: req.body.id });

    if (!food || !quantity) {
      res.end('Food or quantity missing');
    } else {
      cart.orders.forEach((order) => {
        if (order.food.toString() === food) {
          order.quantity = parseInt(quantity);
        }
      });

      await cart.save();
      res.status(200).send(cart);
    }
  } catch (err) {
    res.send(err.toString());
  }
};
