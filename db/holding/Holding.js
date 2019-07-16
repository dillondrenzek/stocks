const mongoose = require('mongoose');

// Schema
const holdingSchema = new mongoose.Schema({
    cost: Number,
    quantity: Number,
    symbol: String,
    portfolioId: String, 
    // trades: Trade._id[]
});

// Static Methods
holdingSchema.statics.findBySymbol = async function(symbol) {
    return await this.find({
        symbol
    });
};

// Instance Methods
holdingSchema.methods.addPortfolio = async function(portfolioId) {
    // this.portfolioId = portfolioId
};


// Export
module.exports = mongoose.model('Holding', holdingSchema);