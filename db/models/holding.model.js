const mongoose = require('mongoose');

let HoldingSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});


// Export the model
module.exports = mongoose.model('Holding', HoldingSchema);