const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  chain: {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    required: true,
    unique: true,
  },
  address: { type: String, required: [true, 'address is required'] },
  longitude: Number,
  latitude: Number,
  radius: { type: Number, default: 10 },
  owner: {
    type: 'ObjectId',
    ref: 'User',
    required: true,
  },
});

const Resturant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Resturant;
