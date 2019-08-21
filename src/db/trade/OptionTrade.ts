import mongoose from 'mongoose';
import { CallOrPut, OpenOrClose } from '../../types';
import { ITrade, ITradeDocument } from './Trade';

export interface IOptionTrade extends ITrade {
  callPut: CallOrPut;
  expDate: Date;
  openClose: OpenOrClose;
  strikePrice: number;
  type: 'option';
}

export const defaultOptionTrade = (): IOptionTrade => ({
  price: 0.00,
  quantity: 0,
  side: null,
  symbol: '',
  timestamp: new Date(),
  callPut: null,
  expDate: new Date(),
  openClose: null,
  strikePrice: 0.00,
  type: 'option',
});

export type IOptionTradeDocument = IOptionTrade & mongoose.Document;

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
