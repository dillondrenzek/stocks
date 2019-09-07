import mongoose from 'mongoose';
import * as Types from '../../lib/types';
import { ITransaction, ITransactionDocument } from './Transaction';

export interface IStockTransaction extends Types.StockTransaction {}

export type IStockTransactionDocument = IStockTransaction & mongoose.Document;

// Stock Trade

const stockTransactionSchema = new mongoose.Schema<IStockTransactionDocument>({
  price: {
    type: Number,
    default: 0.00
  },
  quantity: {
    type: Number,
    default: 0
  },
  side: {
    type: String,
    default: null
  }, // 'buy' or 'sell'
  symbol: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now()
  },
  type: {
    type: String,
    default: 'stock'
  },
});

// export const defaultStockTransaction = (): IStockTransaction => ({
//   price: 0.00,
//   quantity: 0,
//   side: null,
//   symbol: '',
//   date: new Date(),
//   type: 'stock'
// });

interface IStockTransactionModel extends mongoose.Model<IStockTransactionDocument> {
  // findBySymbol: (name: string) => Promise<IStockTransactionDocument[]>;
}

// stockTradeSchema.statics.findBySymbol = async (symbol: string): Promise<IStockTransactionDocument[]> => {
//   return await [];
// };

export const StockTransaction = mongoose.model<IStockTransactionDocument, IStockTransactionModel>('StockTransaction', stockTransactionSchema);
