import mongoose from 'mongoose';
import { ITransaction, ITransactionDocument } from './Trade';

export interface IStockTrade extends ITransaction {
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

interface IStockTradeModel extends mongoose.Model<IStockTradeDocument> {
  findBySymbol: (name: string) => Promise<IStockTradeDocument[]>;
}

stockTradeSchema.statics.findBySymbol = async (symbol: string): Promise<IStockTradeDocument[]> => {
  return await [];
};

export const StockTrade = mongoose.model<IStockTradeDocument, IStockTradeModel>('StockTrade', stockTradeSchema);
