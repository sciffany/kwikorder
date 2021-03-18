const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  food: {
    type: 'ObjectId',
    ref: 'Food',
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  customer: { type: 'ObjectId', ref: 'User', required: true },
  restaurant: { type: 'ObjectId', ref: 'Restaurant', required: true },
  date: { type: Date, default: new Date() },
  orders: [orderSchema],
  status: { type: String, enum: ['NEW', 'PROCESSING', 'PAID'], default: 'NEW' },
});

module.exports = mongoose.model('Cart', cartSchema);
