const {Trade, Holding, Portfolio} = require('../db');

class PortfolioController {

    async createPortfolio({ name, holding_ids }) {
        const portfolio = new Portfolio({
            name,
            holding_ids
        });
        await portfolio.save();
    }

    // addTradeToPortfolio?
    async addTrade(trade) {
        // save trade

        // get Holding by symbol
        // const holding = await Holding.findBySymbol();

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
