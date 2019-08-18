import * as DB from '../../db';
import * as Types from '../../types';
// import { Holding, OptionTrade, Portfolio, StockTrade, Trade } from '../../types';

export class PortfolioController {

  public async createPortfolioWithName(name: string): Promise<Types.Portfolio> {
    const portfolio = await DB.Portfolio.createByName(name);
    return portfolio;
  }

  public async getPortfolios(): Promise<DB.IPortfolioDocument[]> {
    const portfolios = await DB.Portfolio.find();
    return portfolios;
  }

  public async getPortfolioById(id: string): Promise<DB.IPortfolioDocument> {
    const portfolio = await DB.Portfolio.findById(id);
    return portfolio;
  }

  public async deletePortfolioById(id: string): Promise<DB.IPortfolioDocument> {
    try {
      const removed = await DB.Portfolio.findByIdAndDelete(id);
      return removed;
    } catch (error) {
      // console.error('Error deleting portfolio:', error);
      return null;
    }
  }



  public async addTradeToPortfolio(trade: Types.Trade, portfolioId: string) {

    // save trade
    let newTrade: DB.ITradeDocument;
    let portfolio: DB.IPortfolioDocument = await DB.Portfolio.findById(portfolioId);

    try {
      switch (trade.type) {
        case 'stock':
          newTrade = await DB.StockTrade.create(trade);
          break;
        case 'option':
          newTrade = await DB.OptionTrade.create(trade);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }

    await portfolio.addTrade(newTrade);

    // get Holding by symbols
    const holding: Types.Holding = this.findHoldingBySymbol(trade.symbol, portfolio);

    // if holding doesn't exist, create it
    if (!holding) {
    }

    await portfolio.save();
  }

  private findHoldingBySymbol(symbol: string, portfolio: Types.Portfolio): Types.Holding {
    return portfolio.holdings.find((holding) => holding.symbol === symbol);
  }

  public async getStockTradesForPortfolioById(id: string): Promise<Types.StockTrade[]> {
    const portfolio = await DB.Portfolio.findById(id);
    const trades = await portfolio.getAllStockTrades();
    return trades;
  }

  public async getOptionTradesForPortfolioById(id: string): Promise<Types.OptionTrade[]> {
    const portfolio = await DB.Portfolio.findById(id);
    const trades = await portfolio.getAllOptionTrades();
    return trades;
  }

  public async deleteStockTradeForPortfolioById(tradeId: string, portfolioId: string): Promise<void> {
    const portfolio = await DB.Portfolio.findById(portfolioId);
    const trade = await DB.StockTrade.findById(tradeId);
    await portfolio.deleteTrade(trade);
  }

}
