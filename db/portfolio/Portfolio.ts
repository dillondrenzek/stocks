import mongoose from 'mongoose';
import { IHoldingDocument } from '../holding/Holding';
import { ITradeDocument, IStockTradeDocument, IOptionTradeDocument } from '../trade';

// Interface

export interface IPortfolio {
  holdingIds: Array<IHoldingDocument['_id']>;
  name: string;
  optionTrades: Array<IOptionTradeDocument['_id']>;
  stockTrades: Array<IStockTradeDocument['_id']>;
  addTrade?: (doc: ITradeDocument) => void;
  addHolding?: (doc: IHoldingDocument) => void;
}

export const defaultPortfolio = (): IPortfolio => ({
  holdingIds: [],
  optionTrades: [],
  stockTrades: [],
  name: ''
});

export type IPortfolioDocument = IPortfolio & mongoose.Document;

// Schema

const portfolioSchema = new mongoose.Schema<IPortfolioDocument>({
  holdingIds: Array, // Object Ids
  name: String,
  optionTrades: Array,
  stockTrades: Array,
});

// Static Methods

portfolioSchema.statics.createDefault = async function() {
  const portfolio: IPortfolioDocument = new Portfolio(defaultPortfolio());
  return portfolio;
}

// Instance Methods

portfolioSchema.methods.addTrade = async function(trade: ITradeDocument) {
  if (trade.type === 'stock') {
    this.stockTrades.push(trade._id);
    await this.save();
  } else if (trade.type === 'option') {
    this.optionTrades.push(trade._id);
    await this.save();
  }
};

portfolioSchema.methods.addHolding = async function(holding: IHoldingDocument) {
  this.holdingIds.push(holding.id);
  await this.save();
};

// Export Model

export const Portfolio = mongoose.model<IPortfolioDocument>('Portfolio', portfolioSchema);
