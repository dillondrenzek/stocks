const mongoose = require('mongoose');

module.exports = {
    Trade: require('./models/Trade'),
    TradeController: require('./controllers/tradeController'),
    connectDb: function(connectionString) {
        mongoose.connect(connectionString, { useNewUrlParser: true });
    }
}