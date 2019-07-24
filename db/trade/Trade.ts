import mongoose, { Schema } from 'mongoose';
import { BuyOrSell, StockOrOption } from '../types';

export interface ITradeDocument extends mongoose.Document {
  price: number;
  quantity: number;
  side: BuyOrSell;
  symbol: string;
  timestamp: Date;
  type: StockOrOption;
}

export interface IStockTradeDocument extends ITradeDocument {
  type: 'stock';
}

export interface IOptionTradeDocument extends ITradeDocument {
  callPut: 'call' | 'put';
  expDate: Date;
  openClose: 'open' | 'close';
  strikePrice: number;
  type: 'option';
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

// Option Trade

const optionTradeSchema = new mongoose.Schema<IOptionTradeDocument>({
  callPut: String,
  expDate: Date,
  openClose: String,
  price: Number,
  quantity: Number,
  side: String, // 'buy' or 'sell'
  strikePrice: Number,
  symbol: String,
  timestamp: Date,
  type: String,
});

export const OptionTrade = mongoose.model<IOptionTradeDocument>('OptionTrade', optionTradeSchema);
