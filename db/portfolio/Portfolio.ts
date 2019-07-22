import mongoose from 'mongoose';
import { IHoldingDocument } from '../holding/Holding';
import { ITradeDocument } from '../trade/Trade';

export interface IPortfolioDocument extends mongoose.Document {
  holdingIds: Array<IHoldingDocument['_id']>;
  tradeIds: Array<ITradeDocument['_id']>;
  name: string;
  addTrade ?: (id: ITradeDocument['_id']) => void;
}

const portfolioSchema = new mongoose.Schema<IPortfolioDocument>({
  holdingIds: Array, // String ids
  name: String,
  tradeIds: Array, // String ids
});

portfolioSchema.methods.addTrade = async function(id: ITradeDocument['_id']) {
  this.tradeIds.push(id);
  await this.save();
};

// Export
export const Portfolio = mongoose.model<IPortfolioDocument>('Portfolio', portfolioSchema);
