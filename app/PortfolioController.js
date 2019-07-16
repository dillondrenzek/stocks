const {Trade, Holding, Portfolio} = require('../db');

class PortfolioController {

    async createPortfolio(name) {

    }

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

module.exports = PortfolioController;
