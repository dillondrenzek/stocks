const mongoose = require('mongoose');
const Trade = require('./models/Trade');

class Db {

    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    async connect() {
        console.log('Connecting to DB');
        return await mongoose.connect(this.connectionString, { useNewUrlParser: true });
    }

    async printData() {
        await this.connect();
        console.log('Printing data...');
        try {
            const trades = await Trade.find();
            if (trades.length) {
                console.log(trades);
            } else {
                console.log('No data');
            }
        } catch (error) {
            console.error('Error', error);
        }
        console.log('Done.');
    }

    async seedData() {
        await this.connect();
        console.log('Seeding data...');
        const data = new Trade({
            date: Date.now(),
            quantity: 12.345,
            price: 100,
            side: 'buy',
            symbol: 'TEST'
        });

        await data.save();
        console.log('Done.');
    }
}

module.exports = async function(input) {

    const db = new Db('mongodb://localhost:27017/stocks');

    switch (input._[1]) {
        case 'print':
            await db.printData();
            break;
        case 'seed':
            await db.seedData();
            break;
        default:
            console.log('No arguments');
    }
}