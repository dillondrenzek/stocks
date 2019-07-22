import * as DB from '../db';
import { Holding, Portfolio, Trade } from './types';

export class PortfolioController {

    public async createPortfolioWithName(name: string): Promise<Portfolio> {
        const portfolio = await DB.Portfolio.create({
            holdingIds: [],
            name
        });
        return portfolio;
    }

    public async getPortfolios(): Promise<Portfolio[]> {
        const portfolios = await DB.Portfolio.find();
        return portfolios;
    }

    public async getPortfolioById(id: string): Promise<Portfolio> {
        const portfolio = await DB.Portfolio.findById(id);
        return portfolio;
    }

    // addTradeToPortfolio?
    public async addTradeToPortfolio(trade: Trade, portfolio: Portfolio) {
        // // save trade
        // const trade = await DB.Trade.create({
        //     quantity,
        //     price,
        //     side,
        //     symbol,
        // });
        // // get Holding by symbols
        // const holding = await DB.Holding.findBySymbol(symbol);

        // // if holding doesn't exist, create it
        // if (!holding) {
        //     await this.createHolding({
        //         cost: price,
        //         quantity,
        //         symbol,
        //     });
        // }
    }

    public async createHolding({  cost, symbol, quantity, }: Partial<Holding>) {
        return await DB.Holding.create({
            cost,
            quantity,
            symbol,
        });
    }

    public async getHoldingBySymbol(symbol: string) {
        const holding = await DB.Holding.findBySymbol(symbol);
        return holding || null;
    }

    public async getHoldings() {
        const holdings = await DB.Holding.find();
        return holdings;
    }

    // public async addTradeToHolding(trade: any, holding: any) {

    // }

    // public async getTradesForHolding() {

    // }

}
