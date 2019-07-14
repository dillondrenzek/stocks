const mongoose = require('mongoose');

module.exports = {
    Trade: require('./trade/Trade'),
    TradeController: require('./trade/TradeController'),
    connectDb: require('./connect')
};