import * as DB from '../../db';
// import { Holding, OptionTrade, Portfolio, StockTrade, Trade } from '../../types';

export class PortfolioController {

  public async createPortfolioWithName(name: string): Promise<DB.IPortfolioDocument> {
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



  public async addTradeToPortfolio(trade: DB.ITradeDocument, portfolio: DB.IPortfolioDocument) {

    // save trade
    let newTrade: DB.ITradeDocument;

    try {
      switch (trade.type) {
        case 'stock':
          newTrade = await DB.StockTrade.create(trade);
          portfolio.stockTrades.push(newTrade._id);
          break;
        case 'option':
          newTrade = await DB.OptionTrade.create(trade);
          portfolio.optionTrades.push(newTrade._id);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }

    // get Holding by symbols
    const holding: Holding = null;

    // if holding doesn't exist, create it
    if (!holding) {
        // await this.createHolding({
        //     cost: price,
        //     quantity,
        //     symbol,
        // });
    }

    portfolio.save();
  }

  private findHoldingBySymbol(): Holding {

  }

  public async getStockTradesForPortfolioById(id: string): Promise<StockTrade[]> {
    const portfolio = await DB.Portfolio.findById(id);
    const trades = await portfolio.getAllStockTrades();
    return trades;
  }

  public async getOptionTradesForPortfolioById(id: string): Promise<OptionTrade[]> {
    const portfolio = await DB.Portfolio.findById(id);
    const trades = await portfolio.getAllOptionTrades();
    return trades;
  }

  public async deleteStockTradeForPortfolioById(tradeId: string, portfolioId: string): Promise<void> {
    const portfolio = await DB.Portfolio.findById(portfolioId);
    const trade = await DB.StockTrade.findById(tradeId);
    await portfolio.deleteTrade(trade);
  }

  // private async updateOrCreateHolding

  // public async getHoldingsForPortfolio(portfolio: Portfolio): Promise<Holding[]> {
  //   const holdings = await DB.Holding.find({ _id: { $in: portfolio.holdingIds }});
  //   return holdings;
  // }

  public async getHoldingBySymbol(symbol: string) {
    const holding = await DB.Holding.findBySymbol(symbol);
    return holding || null;
  }

  // public async getHoldings() {
  //   const holdings = await DB.Holding.find();
  //   return holdings;
  // }

}
