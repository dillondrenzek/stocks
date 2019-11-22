import mongoose from 'mongoose';
import * as Types from '../../src/lib/types';
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
};

function newHoldingFromTransaction(tx: Types.Transaction | ITransactionDocument): Types.Holding {
  const id = getId(tx);
  const stockTransactions = (tx.type === 'stock') ? [ id ] : [];
  const optionTransactions = (tx.type === 'option') ? [ id ] : [];

  return {
    symbol: tx.symbol,
    stockTransactions,
    optionTransactions
  };
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
  const existing = holdings[symbol];
  const updated = (existing)
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
  const existing = holdings[t.symbol];
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
};

// Export Model
export const Portfolio = mongoose.model<IPortfolioDocument, IPortfolioDocumentModel>('Portfolio', portfolioSchema);
