const mongoose = require('mongoose');

class Db {

    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    async connect() {
        return await mongoose.connect(this.connectionString, { useNewUrlParser: true });
    }
}

const createDb = (connectionString) => {
    return new Db(connectionString);
}

exports = {
    Trade: require('./models/Trade'),
    createDb
}