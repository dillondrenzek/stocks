const { createDb, Trade } = require('../db');

async function trade(input) {

    const connectionString = 'mongodb://localhost:27017/stocks';
    const db = createDb(connectionString);

    switch (input._[2]) {
        case 'seed':
            const trade = new Trade({
                date: Date.now(),
                quantity: 3,
                price: 123,
                side: 'buy', // 'buy' or 'sell'
                symbol: 'TEST',
            });
            await trade.save();
            break;
        default:
            console.log('[Trade usage]');
    }
}

module.exports = async function(input) {

    switch (input._[1]) {
        case 'trades':
            await trade(input);
            break;
        default:
            console.log('No arguments');
    }
}