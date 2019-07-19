import mongoose from 'mongoose';
import { IHoldingDocument } from '../holding/Holding';

export interface IPortfolioDocument extends mongoose.Document {
  holdingIds: Array<IHoldingDocument['id']>;
  name: string;
}

const portfolioSchema = new mongoose.Schema<IPortfolioDocument>({
  holdingIds: Array, // String ids
  name: String,
});

// Export
export const Portfolio = mongoose.model<IPortfolioDocument>('Portfolio', portfolioSchema);
