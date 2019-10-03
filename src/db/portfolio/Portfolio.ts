import mongoose from 'mongoose';
import * as Types from '../../lib/types';
import { ITransactionDocument } from '../transaction';

// Interface

export interface IPortfolio extends Types.Portfolio {
  fetchTransactions?: () => void;
  addTransaction?: (doc: Types.Transaction | ITransactionDocument) => IPortfolio;
  removeTransaction?: (doc: Types.Transaction | ITransactionDocument) => Promise<IPortfolioDocument>;
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

const getId = (tx: Types.Transaction | ITransactionDocument) => {
  return (typeof tx._id === 'string') ? tx._id : (tx as ITransactionDocument).id;
}

function newHoldingFromTransaction(tx: Types.Transaction | ITransactionDocument): Types.Holding {
  const id = getId(tx);
  const stockTransactions = (tx.type === 'stock') ? [ id ] : [];
  const optionTransactions = (tx.type === 'option') ? [ id ] : [];
  
  return {
    symbol: tx.symbol,
    stockTransactions,
    optionTransactions
  }
}

function addTxIdToArray(txId: string, arr: string[]): string[] {
  if (arr.indexOf(txId) === -1) {
    return [txId, ...arr];
  } else {
    return arr;
  }
}

function addTransactionToHolding(tx: Types.Transaction | ITransactionDocument, holding: Types.Holding): Types.Holding {
  const id = getId(tx);

  if (tx.type === 'stock') {
    return Object.assign({}, holding, {
      stockTransactions: addTxIdToArray(id, holding.stockTransactions)
    });
  } else if (tx.type === 'option') {
    return Object.assign({}, holding, {
      optionTransactions: addTxIdToArray(id, holding.optionTransactions)
    });
  }
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

function removeTxIdFromArray(txId: string, arr: string[]): string[] {
  return arr.filter((id) => {
    return txId !== id;
  });
}

function removeTransactionFromHolding(tx: Types.Transaction | ITransactionDocument, holding: Types.Holding): Types.Holding {
  const id = getId(tx);

  if (tx.type === 'stock') {
    return Object.assign({}, holding, {
      stockTransactions: removeTxIdFromArray(id, holding.stockTransactions)
    });
  } else if (tx.type === 'option') {
    return Object.assign({}, holding, {
      optionTransactions: removeTxIdFromArray(id, holding.optionTransactions)
    });
  }
}

function removeTransactionFromHoldings(t: Types.Transaction | ITransactionDocument, holdings: Types.Holdings): Types.Holdings {
  let existing = holdings[t.symbol];
  return (t._id) ? Object.assign({}, holdings, {
    [t.symbol]: removeTransactionFromHolding(t, existing)
  }) : holdings;
}

portfolioSchema.methods.addTransaction = function(transaction: ITransactionDocument): Types.Portfolio {
  
  // add Holding if it doesn't exist
  this.holdings = addTransactionToHoldings(transaction, this.holdings);

  return this;
};

portfolioSchema.methods.removeTransaction = async function(transaction: ITransactionDocument): Promise<IPortfolioDocument> {

  // remove Transaction
  this.holdings = removeTransactionFromHoldings(transaction, this.holdings);
  // save Portfolio
  await this.save();

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
