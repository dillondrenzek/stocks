import * as DB from '../../db';
import * as Types from '../../types';
// // import { Holding, OptionTrade, Portfolio, StockTrade, Trade } from '../../types';
// import { calculateHolding } from '../portfolio';

export class PortfolioController {

  public static async createPortfolioWithName(name: string): Promise<Types.Portfolio> {
    const portfolio = await DB.Portfolio.createByName(name);
    return portfolio;
  }

  public static async getPortfolios(): Promise<Types.Portfolio[]> {
    const portfolios = await DB.Portfolio.find();
    return portfolios;
  }

  public static async getPortfolioById(id: string): Promise<Types.Portfolio> {
    let portfolio = await DB.Portfolio.findById(id);
    // for each holding, we need it populated with each of it's transactions
    await portfolio.fetchTransactions();

    return portfolio;
  }

  public static async deletePortfolioById(id: string): Promise<DB.IPortfolioDocument> {
    try {
      const removed = await DB.Portfolio.findByIdAndDelete(id);
      return removed;
    } catch (error) {
      // console.error('Error deleting portfolio:', error);
      return null;
    }
  }

  private addTransactionToPortfolio(tx: Types.Transaction, portfolio: Types.Portfolio) {

  }

  public static async addTransactionsToPortfolio(tx: Types.Transaction | Types.Transaction[], portfolioId: string): Promise<Types.Portfolio> {
    let portfolio: DB.IPortfolioDocument;

    if (!Array.isArray(tx)) {
      // find portfolio
      portfolio = await DB.Portfolio.findById(portfolioId);
      // create and save transaction
      let transaction = await DB.StockTransaction.create(tx);
      // add transaction id to Portfolio
      portfolio = await portfolio.addTransaction(transaction);

      // console.log('-- portfolio', portfolio, '\n-- transaction', transaction);
    } else {
      // NYI - Not yet implemented
    }

    return portfolio;
  } 

//   private async calculateHoldingForSymbol(symbol: string): Promise<Types.Holding> {
//     const stockTrades = await DB.StockTrade.findBySymbol(symbol);
//     const holding = calculateHolding(stockTrades);
//     return holding;
//   }

//   private findHoldingBySymbol(symbol: string, portfolio: Types.Portfolio): Types.Holding {
//     return portfolio.holdings.find((holding) => holding.symbol === symbol);
//   }

//   public async getStockTradesForPortfolioById(id: string): Promise<Types.StockTrade[]> {
//     const portfolio = await DB.Portfolio.findById(id);
//     const trades = await portfolio.getAllStockTrades();
//     return trades;
//   }

//   public async getOptionTradesForPortfolioById(id: string): Promise<Types.OptionTrade[]> {
//     const portfolio = await DB.Portfolio.findById(id);
//     const trades = await portfolio.getAllOptionTrades();
//     return trades;
//   }



//   public async deleteStockTradeForPortfolioById(tradeId: string, portfolioId: string): Promise<DB.IPortfolioDocument> {
//     const portfolio = await DB.Portfolio.findById(portfolioId);
//     const trade = await DB.StockTrade.findById(tradeId);

//     // remove trade from portfolio
//     await portfolio.removeTradeById(trade.type, trade.id);

//     // delete trade
//     await DB.StockTrade.findByIdAndDelete(tradeId);

//     // recalculate corresponding holding
//     const holding: Types.Holding = await this.calculateHoldingForSymbol(trade.symbol);
//     return await portfolio.addOrUpdateHolding(holding);
    
//   }

}
