import mongoose from 'mongoose';
import { IHoldingDocument } from '../holding/Holding';
import { ITradeDocument } from '../trade';

// Interface

export interface IPortfolioDocument extends mongoose.Document {
  holdingIds: Array<IHoldingDocument['_id']>;
  tradeIds: Array<ITradeDocument['_id']>;
  name: string;
  addTrade?: (id: ITradeDocument) => void;
  addHolding?: (id: IHoldingDocument) => void;
}

// Schema

const portfolioSchema = new mongoose.Schema<IPortfolioDocument>({
  holdingIds: Array, // String ids
  name: String,
  tradeIds: Array, // String ids
});

// Instance Methods

portfolioSchema.methods.addTrade = async function(trade: ITradeDocument) {
  this.tradeIds.push(trade.id);
  await this.save();
};

portfolioSchema.methods.addHolding = async function(holding: IHoldingDocument) {
  this.holdingIds.push(holding.id);
  await this.save();
};

// Export Model

export const Portfolio = mongoose.model<IPortfolioDocument>('Portfolio', portfolioSchema);
