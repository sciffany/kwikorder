const Cart = require('../models/Cart');

exports.create = async (req, res) => {
  try {
    let cart = new Cart(req.body);
    cart = await cart.save();
    res.status(200).json(food);
  } catch (err) {
    res.send(err.toString());
  }
};

exports.read = async (req, res) => {
  try {
    const cart = await Food.Cart({ _id: req.params.id });
    res.status(200).json(food);
  } catch (err) {
    res.status(404).send(err.toString());
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
    const cart = await Cart.find().where('category').equals(req.query.category);

    res.status(200).json(cart);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};

exports.addToCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
      cart: req.params.cartId,
    });
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
      orders: [...{ cart: req.params.id, quantity: req.params.quantity }],
    });

    res.status(200).json();
  } catch (err) {
    res.status(404).send(err.toString());
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndRemove(req.params.id, {
      orders: [...{ cart: req.params.id, quantity: req.params.quantity }],
    });

    res.status(200).json(cart);
  } catch (err) {
    res.status(404).send(err.toString());
  }
};
