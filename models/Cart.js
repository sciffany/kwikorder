const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: String,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    orders: [{
        quantity: Number,
        ref: 'FoodItem'
    }],
    status: String
});

module.exports =  mongoose.model('Cart', cartSchema);
