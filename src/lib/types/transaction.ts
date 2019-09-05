import { Saveable } from './db';

export type BuyOrSell = 'buy' | 'sell';
export type CallOrPut = 'call' | 'put';
export type OpenOrClose = 'open' | 'close';
export type StockOrOption = 'stock' | 'option';

export interface Transaction extends Saveable {
  price: number;
  quantity: number;
  side: BuyOrSell;
  symbol: string;
  date?: Date;
  type: StockOrOption;
}

export interface StockTransaction extends Transaction {
  type: 'stock';
}

export interface OptionTransaction extends Transaction {
  type: 'option';
  strikePrice: number;
  callPut: CallOrPut;
  expirationDate: Date; // MM-DD-YYYY
}