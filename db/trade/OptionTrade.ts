import mongoose from 'mongoose';
import { ITradeDocument } from './ITradeDocument';

export interface IOptionTradeDocument extends ITradeDocument {
  callPut: 'call' | 'put';
  expDate: Date;
  openClose: 'open' | 'close';
  strikePrice: number;
  type: 'option';
}

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
