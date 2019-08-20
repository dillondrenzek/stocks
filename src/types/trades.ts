import { Saveable } from './db';

export type BuyOrSell = 'buy' | 'sell';
export type CallOrPut = 'call' | 'put';
export type OpenOrClose = 'open' | 'close';
export type StockOrOption = 'stock' | 'option';

export interface Trade extends Saveable {
  price: number;
  quantity: number;
  side: BuyOrSell;
  symbol: string;
  timestamp?: Date;
  type: StockOrOption;
}

export interface StockTrade extends Trade {
  type: 'stock';
}

export interface OptionTrade extends Trade {
  type: 'option';
}
