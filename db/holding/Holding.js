const mongoose = require('mongoose');

// Schema
const holdingSchema = new mongoose.Schema({
    cost: Number,
    quantity: Number,
    symbol: String,
    // trades: Trade._id[]
});

holdingSchema.statics.findBySymbol = async function(symbol) {
    return await this.find({
        symbol
    });
};


// Export
module.exports = mongoose.model('Holding', holdingSchema);