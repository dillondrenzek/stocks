const mongoose = require('mongoose');

let HoldingSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    avgCost: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});


// Export the model
module.exports = mongoose.model('Holding', HoldingSchema);