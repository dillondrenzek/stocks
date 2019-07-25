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

export * from './OptionTrade';
export * from './StockTrade';