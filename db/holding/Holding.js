const mongoose = require('mongoose');

// Schema
const holdingSchema = new mongoose.Schema({
    cost: Number,
    quantity: Number,
    symbol: String,
});

// Export
module.exports = mongoose.model('Holding', holdingSchema);