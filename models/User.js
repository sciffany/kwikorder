const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurant: {
    type: 'ObjectId',
    ref: 'Restaurant',
  },
});

module.exports = mongoose.model('User', userSchema);
