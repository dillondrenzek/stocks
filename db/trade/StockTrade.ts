import mongoose from 'mongoose';
import { ITradeDocument } from '.';

export interface IStockTradeDocument extends ITradeDocument {
  type: 'stock';
}

// Stock Trade

const stockTradeSchema = new mongoose.Schema<IStockTradeDocument>({
  price: Number,
  quantity: Number,
  side: String, // 'buy' or 'sell'
  symbol: String,
  timestamp: Date,
  type: String,
});

export const StockTrade = mongoose.model<IStockTradeDocument>('StockTrade', stockTradeSchema);
