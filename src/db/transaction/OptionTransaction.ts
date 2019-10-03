import mongoose from 'mongoose';
import * as Types from '../../lib/types';
import { CallOrPut, OpenOrClose } from '../../lib/types';
import { ITransaction } from './Transaction';

export interface IOptionTransaction extends Types.OptionTransaction {}

export const defaultOptionTransaction = (): IOptionTransaction => ({
  price: 0.00,
  quantity: 0,
  side: null,
  symbol: '',
  date: new Date(),
  callPut: null,
  expirationDate: '',
  strikePrice: 0.00,
  type: 'option',
});

export type IOptionTransactionDocument = IOptionTransaction & mongoose.Document;

const optionTransactionSchema = new mongoose.Schema<IOptionTransactionDocument>({
  callPut: {
    type: String,
    default: null
  },
  expirationDate: String,
  price: Number,
  quantity: Number,
  side: String, // 'buy' or 'sell'
  strikePrice: Number,
  symbol: String,
  timestamp: Date,
  type: String,
});

export const OptionTransaction = mongoose.model<IOptionTransactionDocument>('OptionTransaction', optionTransactionSchema);
