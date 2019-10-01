import * as DB from '../../db';
import * as Types from '../../lib/types';
import { TransactionController } from './TransactionController';
import { StockTransactionController } from './StockTransactionController';
import { OptionTransactionController } from './OptionTransactionController';

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
    const fetchedStockTransactions = await StockTransactionController.getTransactionsByIds(h.stockTransactions);
    const fetchedOptionTransactions = await OptionTransactionController.getTransactionsByIds(h.optionTransactions);

    // assign the fetched transactions to the holding's transactions array
    const resultHolding: Types.Holding = Object.assign({}, h, {
      stockTransactions: fetchedStockTransactions,
      optionTransactions: fetchedOptionTransactions
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
    let transaction;

    // create transaction
    switch (tx.type) {
      case 'stock': {
        transaction = await StockTransactionController.saveTransaction(tx);
        break;
      }
      case 'option': {
        transaction = await OptionTransactionController.saveTransaction(tx);
        break;
      }
      default:
        throw new Error('Could not and transaction of type');
    }

    // add transaction to Portfolio
    portfolio.addTransaction(transaction);
    // save portfolio
    portfolio = await portfolio.save();

    return this.toPortfolio(portfolio);
  } 

  public static async removeTransactionFromPortfolio(txId: string, portfolioId: string): Promise<Types.Portfolio> {
    // find portfolio
    let portfolio: DB.IPortfolioDocument = await DB.Portfolio.findById(portfolioId);
    // find transaction
    let transaction: DB.IStockTransactionDocument = await DB.StockTransaction.findById(txId);

    if (transaction) {
      // remove transaction
      portfolio = await portfolio.removeTransaction(transaction);
    }

    return this.toPortfolio(portfolio);
  }

  public static toPortfolio(p: Types.Portfolio | DB.IPortfolioDocument): Types.Portfolio {
    return {
      _id: (typeof p._id === 'string') ? p._id : (p as DB.IPortfolioDocument).id,
      name: p.name,
      holdings: p.holdings
    }
  }

}
