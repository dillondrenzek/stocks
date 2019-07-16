const mongoose = require('mongoose');

module.exports = {
    Holding: require('./holding/Holding'),
    Trade: require('./trade/Trade'),
    Portfolio: require('./portfolio/Portfolio'),
    connectDb: require('./connect')
};