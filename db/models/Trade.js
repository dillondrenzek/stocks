const mongoose = require('mongoose');

let TradeSchema = new mongoose.Schema({
    date: Date,
    quantity: Number,
    price: Number,
    side: String, // 'buy' or 'sell'
    symbol: String,
});


// Export the model
exports = mongoose.model('Trade', TradeSchema);