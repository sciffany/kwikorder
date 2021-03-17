const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: String,
  price: { type: Number, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  category: { type: String, required: true },
  restaurant: { type: 'ObjectId', ref: 'Restaurant' },
  cart: { type: 'ObjectId', ref: 'Cart' },
});

module.exports = mongoose.model('Food', foodSchema);
