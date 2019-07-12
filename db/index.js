const mongoose = require('mongoose');

module.exports = {
    Trade: require('./trade/Trade'),
    TradeController: require('./trade/tradeController'),
    connectDb: function(connectionString) {
        mongoose.connect(connectionString, { useNewUrlParser: true });
    }
}