const {Trade, Holding, Portfolio} = require('../db');

class PortfolioController {

    async createPortfolio({ name, holding_ids }) {
        const portfolio = await Portfolio.create({
            name,
            holding_ids
        });
        return portfolio;
    }

    async getPortfolios() {
        const portfolios = await Portfolio.find();
        return portfolios;
    }

    async getPortfolioById(id) {
        const portfolio = await Portfolio.findById(id);
        return portfolio;
    }

    // addTradeToPortfolio?
    async addTrade({ symbol, quantity, price, side }) {
        // save trade
        const trade = await Trade.create({
            symbol,
            quantity,
            price,
            side,
        });
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
