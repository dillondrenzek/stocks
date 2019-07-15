const mongoose = require('mongoose');

module.exports = {
    Trade: require('./trade/Trade'),
    connectDb: require('./connect')
};