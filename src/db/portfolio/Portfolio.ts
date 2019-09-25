import mongoose from 'mongoose';
import * as Types from '../../lib/types';
import { ITransactionDocument } from '../transaction';

// Interface

export interface IPortfolio extends Types.Portfolio {
  fetchTransactions?: () => void;
  addTransaction?: (doc: Types.Transaction | ITransactionDocument) => IPortfolio;
  removeTransaction?: (doc: Types.Transaction | ITransactionDocument) => IPortfolio;
}

export const defaultPortfolio = (): IPortfolio => ({
  holdings: {},
  name: ''
});

export type IPortfolioDocument = IPortfolio & mongoose.Document;

// Schema

const portfolioSchema = new mongoose.Schema<IPortfolioDocument>({
  holdings: {
    type: Object,
    default: {}
  },
  name: String,
}, { minimize: false});

// Static Methods

interface PortfolioModel {
  createByName: (name: string) => IPortfolioDocument;
}

type IPortfolioDocumentModel = PortfolioModel & mongoose.Model<IPortfolioDocument>;

portfolioSchema.statics.createByName = async function (name: string): Promise<IPortfolioDocument> {
  const portfolio = defaultPortfolio();
  portfolio.name = name;
  return await Portfolio.create(portfolio);
};

// Instance Methods

function newHoldingFromTransaction(transaction: Types.Transaction | ITransactionDocument): Types.Holding {
  const id = (typeof transaction._id === 'string') ? transaction._id : (transaction as ITransactionDocument).id;
  return {
    symbol: transaction.symbol,
    transactions: [ id ]
  }
}

function addTransactionToHolding(t: Types.Transaction | ITransactionDocument, holding: Types.Holding): Types.Holding {
  let { transactions } = holding;
  let newTransactions: string[];
  const id = (typeof t._id === 'string') ? t._id : (t as ITransactionDocument).id;
  // if it doesn't exist, push it
  if (transactions.indexOf(id) === -1) {
    newTransactions = [ id, ...transactions ];
  } else {
    newTransactions = transactions;
  }
  return Object.assign({}, holding, {
    transactions: newTransactions
  });
}

function addTransactionToHoldings(t: Types.Transaction | ITransactionDocument, holdings: Types.Holdings ): Types.Holdings {
  const symbol = t.symbol;
  let existing = holdings[symbol];
  let updated = (existing) 
    ? addTransactionToHolding(t, existing)
    : newHoldingFromTransaction(t);
  return Object.assign({}, holdings, {
    [symbol]: updated
  });
}

function removeTransactionFromHolding(t: Types.Transaction | ITransactionDocument, holding: Types.Holding): Types.Holding {
  const id = (typeof t._id === 'string') ? t._id : (t as ITransactionDocument).id;
  return Object.assign({}, holding, {
    transactions: holding.transactions.filter((txid: string) => txid !== id)
  });
}

function removeTransactionFromHoldings(t: Types.Transaction | ITransactionDocument, holdings: Types.Holdings): Types.Holdings {
  let existing = holdings[t.symbol];
  return (t._id) ? Object.assign({}, holdings, {
    [t.symbol]: removeTransactionFromHolding(t, existing)
  }) : holdings;
}

portfolioSchema.methods.addTransaction = function(transaction: ITransactionDocument): IPortfolio {
  
  // add Holding if it doesn't exist
  this.holdings = addTransactionToHoldings(transaction, this.holdings);

  return this;
};

portfolioSchema.methods.removeTransaction = function(transaction: ITransactionDocument): IPortfolio {
  this.holdings = removeTransactionFromHoldings(transaction, this.holdings);

  return this;
}

// portfolioSchema.methods.getAllStockTrades = async function() {
//   const trades: IStockTradeDocument[] = await StockTrade.find({
//     _id: { $in: this.stockTrades }
//   });
//   return trades;
// };

// portfolioSchema.methods.getAllOptionTrades = async function() {
//   const trades: IOptionTradeDocument[] = await OptionTrade.find({
//     _id: { $in: this.optionTrades }
//   });
//   return trades;
// };

// portfolioSchema.methods.removeTradeById = async function (type: Types.StockOrOption, tradeId: string): Promise<IPortfolioDocument> {
//   const predicate = (id: string) => (id === tradeId);

//   if (type === 'stock') {
//     const index = this.stockTrades.findIndex(predicate);
//     this.stockTrades.splice(index, 1);
//     await this.save();
//   } else if (type === 'option') {
//     this.optionTrades = this.optionTrades.filter(predicate);
//     await this.save();
//   }
//   return this;
// }

// portfolioSchema.methods.addOrUpdateHolding = async function (holding: Holding) {
//   let existingHolding = this.getHoldingBySymbol(holding.symbol);
//   if (!existingHolding) {
//     this.holdings.push(holding);
//   } else {
//     existingHolding = Object.assign(existingHolding, holding);
//     let index = this.holdings.findIndex((h: Holding) => holding.symbol === h.symbol);
//     this.holdings.splice(index, 1, existingHolding);
//   }
//   await this.save();
//   return this;
// }

// portfolioSchema.methods.getHoldingBySymbol = function (symbol: string): Holding {
//   const holding: Holding = this.holdings.find((holding: Holding) => holding.symbol === symbol);
//   return holding;
// }

// portfolioSchema.methods.deleteTrade = async function (trade: ITradeDocument) {
//   const optionTrades: string[] = this.optionTrades;
//   const stockTrades: string[] = this.stockTrades;

//   if (trade.type === 'stock') {
//     // remove id from array
//     this.stockTrades = this.stockTrades.filter((tradeId: any) => { 
//       return trade.id !== tradeId.toString();
//     });
//     // save portfolio
//     await this.save();
//     // delete stock trade
//     await StockTrade.findByIdAndDelete(trade._id);

//   } else if (trade.type === 'option') {
//     // remove id from array
//     this.optionTrades = optionTrades.filter((tradeId: any) => {
//       return trade.id !== tradeId.toString();
//     });
//     // save portfolio
//     await this.save();
//     // delete option trade
//     await OptionTrade.findByIdAndDelete(trade.id);
//   }
// };

// Export Model

export const Portfolio = mongoose.model<IPortfolioDocument, IPortfolioDocumentModel>('Portfolio', portfolioSchema);
