import mongoose from 'mongoose';
import { CallOrPut, OpenOrClose } from '../../lib/types';
import { ITransaction } from './Transaction';

export interface IOptionTransaction extends ITransaction {
  callPut: CallOrPut;
  expDate: Date;
  openClose: OpenOrClose;
  strikePrice: number;
  type: 'option';
}

export const defaultOptionTransaction = (): IOptionTransaction => ({
  price: 0.00,
  quantity: 0,
  side: null,
  symbol: '',
  date: new Date(),
  callPut: null,
  expDate: new Date(),
  openClose: null,
  strikePrice: 0.00,
  type: 'option',
});

export type IOptionTransactionDocument = IOptionTransaction & mongoose.Document;

const optionTransactionSchema = new mongoose.Schema<IOptionTransactionDocument>({
  callPut: {
    type: String,
    default: null
  },
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

export const OptionTransaction = mongoose.model<IOptionTransactionDocument>('OptionTransaction', optionTransactionSchema);
