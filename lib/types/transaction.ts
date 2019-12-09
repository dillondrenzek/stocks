import { Saveable } from './db';

export type BuyOrSell = 'buy' | 'sell';
export type CallOrPut = 'call' | 'put';
export type OpenOrClose = 'open' | 'close';
export type StockOrOption = 'stock' | 'option';

interface BaseTransaction extends Saveable {
  price: number;
  quantity: number;
  side: BuyOrSell;
  symbol: string;
  date: string | Date;
  type: StockOrOption;
}

export type Transaction = StockTransaction | OptionTransaction;

export interface StockTransaction extends BaseTransaction {
  type: 'stock';
}

export interface OptionTransaction extends BaseTransaction {
  type: 'option';
  strikePrice: number;
  callPut: CallOrPut;
  expirationDate: string; // Mth DD YY
}
