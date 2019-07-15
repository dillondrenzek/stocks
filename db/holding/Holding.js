const mongoose = require('mongoose');

// Schema
const holdingSchema = new mongoose.Schema({
    date: Date,
    quantity: Number,
    price: Number,
    side: String, // 'buy' or 'sell'
    symbol: String,
});

// Export
module.exports = mongoose.model('Holding', holdingSchema);