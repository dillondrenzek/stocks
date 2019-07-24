import mongoose, { Schema } from 'mongoose';
import { IPortfolioDocument } from '../portfolio/Portfolio';

export interface ITradeDocument extends mongoose.Document {
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  symbol: string;
  timestamp: Date;
}

export interface ITradeModel extends mongoose.Model<ITradeDocument> {
  // findBySymbol?: (symbol: string) => mongoose.Model<ITradeDocument>;
}

// Schema
const tradeSchema = new mongoose.Schema<ITradeDocument>({
  price: Number,
  quantity: Number,
  side: String, // 'buy' or 'sell'
  symbol: String,
  timestamp: Date,
});

// Export
export const Trade = mongoose.model<ITradeDocument>('Trade', tradeSchema);
