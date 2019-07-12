var mongoose = require('mongoose');

module.exports = function(connectionString) {

    mongoose.connect(connectionString, { useNewUrlParser: true });
    console.log('Connect to', connectionString);

}