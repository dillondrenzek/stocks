const mongoose = require('mongoose');
const { Schema, model } = mongoose

// class Trade {
const tradeSchema = new Schema({
    date: Date,
    quantity: Number,
    price: Number,
    side: String, // 'buy' or 'sell'
    symbol: String,
});

// Export the model
module.exports = mongoose.model('Trade', tradeSchema);