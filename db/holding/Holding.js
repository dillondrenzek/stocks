const mongoose = require('mongoose');

// Schema
const holdingSchema = new mongoose.Schema({
    cost: Number,
    quantity: Number,
    symbol: String,
    portfolio_id: String,
    trade_ids: Array, // Trade._id[]
});

// Static Methods
holdingSchema.statics.findBySymbol = async function(symbol) {
    return await this.find({
        symbol
    });
};

// Instance Methods
holdingSchema.methods.addPortfolio = async function(portfolio_id) {
    this.portfolio_id = portfolio_id;
    await this.save();
};

holdingSchema.methods.addTrade = async function(trade_id) {
    this.trade_ids.push(trade_id);
    await this.save();
};


// Export
module.exports = mongoose.model('Holding', holdingSchema);