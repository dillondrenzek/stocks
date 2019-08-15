import mongoose from 'mongoose';
import { ITrade, ITradeDocument } from './Trade';

export interface IStockTrade extends ITrade {
  type: 'stock';
}

export type IStockTradeDocument = IStockTrade & mongoose.Document;

// Stock Trade

const stockTradeSchema = new mongoose.Schema<IStockTradeDocument>({
  price: Number,
  quantity: Number,
  side: String, // 'buy' or 'sell'
  symbol: String,
  timestamp: Date,
  type: String,
});

export const defaultStockTrade = (): IStockTrade => ({
  price: 0.00,
  quantity: 0,
  side: null,
  symbol: '',
  timestamp: new Date(),
  type: 'stock'
});

export const StockTrade = mongoose.model<IStockTradeDocument>('StockTrade', stockTradeSchema);
