import mongoose from 'mongoose';
import { BuyOrSell, StockOrOption } from '../types';

export interface ITrade {
  price: number;
  quantity: number;
  side: BuyOrSell;
  symbol: string;
  timestamp: Date;
  type: StockOrOption;
}

export type ITradeDocument = ITrade & mongoose.Document;
