const mongoose = require('mongoose');

// Schema
const holdingSchema = new mongoose.Schema({
    cost: Number,
    quantity: Number,
    symbol: String,
});

holdingSchema.statics.findBySymbol = async function(symbol) {
    return await this.find({
        symbol
    });
};


// Export
module.exports = mongoose.model('Holding', holdingSchema);