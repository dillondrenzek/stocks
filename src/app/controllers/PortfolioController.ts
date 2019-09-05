import * as DB from '../../db';
import * as Types from '../../lib/types';
import { TradeController } from './TradeController';
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

  public static async fetchTransactionsForHolding(h: Types.Holding): Promise<Types.Holding> {
    // fetch each transaction in transactions array
    const fetchedTransactions = await TradeController.getTransactionsByIds(h.transactions);

    // assign the fetched transactions to the holding's transactions array
    const resultHolding: Types.Holding = Object.assign({}, h, {
      transactions: fetchedTransactions
    });

    // return the modified holding
    return resultHolding;
  }

  public static async fetchTransactionsForPortfolio(p: Types.Portfolio): Promise<Types.Portfolio> {
    let holdings = p.holdings;
    let resultHoldings = await Promise.all(Object.values(holdings).map((holding) => this.fetchTransactionsForHolding(holding)));
    let result: Types.Holdings = {};

    resultHoldings.forEach((holding) => {
      result[holding.symbol] = holding;
    });

    // return the Portfolio
    return Object.assign({}, p, {
      holdings: result
    });
  }

  public static async getPortfolioById(id: string): Promise<Types.Portfolio> {
    let portfolio: Types.Portfolio = this.toPortfolio(await DB.Portfolio.findById(id));
    // for each holding, we need it populated with each of it's transactions
    let fullPortfolio = await this.fetchTransactionsForPortfolio(portfolio);

    return this.toPortfolio(fullPortfolio);
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

  public static async addTransactionToPortfolio(tx: Types.Transaction, portfolioId: string): Promise<Types.Portfolio> {
    // find portfolio
    let portfolio: DB.IPortfolioDocument = await DB.Portfolio.findById(portfolioId);
    // create and save transaction
    let transaction = await TradeController.saveTransaction(tx);
    // add transaction id to Portfolio
    portfolio.addTransaction(transaction);
    // save portfolio
    portfolio = await portfolio.save();

    return this.toPortfolio(portfolio);
  } 

  public static toPortfolio(p: Types.Portfolio | DB.IPortfolioDocument): Types.Portfolio {
    return {
      _id: (typeof p._id === 'string') ? p._id : (p as DB.IPortfolioDocument).id,
      name: p.name,
      holdings: p.holdings
    }
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
