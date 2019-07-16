const { Trade, Holding, Portfolio } = require('../db');

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
        let holding = await Holding.findBySymbol(symbol);

        // if holding doesn't exist, create it
        if (holding) {
            holding = this.createHolding({ symbol });
        } else {
            // holding.
        }
    }

    async createHolding({ symbol, quantity, cost }) {
        const holding = Holding.create({
            symbol,
            quantity,
            cost
        });
        return holding;
    }

    async getHoldingBySymbol(symbol) {
        const holdings = await Holding.findBySymbol(symbol);
        if (holdings.length === 1) {
            return holdings[0];
        } else {
            return null;
        }
    }

    async getHoldings() {
        const holdings = await Holding.find();
        return holdings;
    }

    async addTradeToHolding(trade, holding) {

    }

    async getTradesForHolding() {

    }

}

module.exports = PortfolioController;