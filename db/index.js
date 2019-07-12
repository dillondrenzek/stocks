const mongoose = require('mongoose');

module.exports = {
    HoldingsController: require('./controllers/holdingsController'),
    connectDb: function(connectionString) {
        return mongoose.connect(connectionString, { useNewUrlParser: true });
    }
}