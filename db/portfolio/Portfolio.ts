import mongoose from 'mongoose';

export interface IPortfolio extends mongoose.Document {
  holdingIds: string[];
  name: string;
}

const portfolioSchema = new mongoose.Schema<IPortfolio>({
  holdingIds: Array, // String ids
  name: String,
});

// Export
export default mongoose.model<IPortfolio>('Portfolio', portfolioSchema);
