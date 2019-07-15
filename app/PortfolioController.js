const Holding = require('../db/holding/Holding');
const Trade = require('../db/trade/Trade');

class PortfolioController {

    async addTrade(trade) {
        // save trade

        // get Holding by symbol
        const holding = await Holding.findBySymbol();

        // if holding doesn't exist, create it
    }

    async getHoldingBySymbol(symbol) {

    }

    async getHoldings() {

    }

    async getTradesForHolding() {

    }

}

module.exports = TradeController;
