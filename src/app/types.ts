export type BuyOrSell = 'buy' | 'sell';
export type CallOrPut = 'call' | 'put';
export type OpenOrClose = 'open' | 'close';
export type StockOrOption = 'stock' | 'option';

export interface Portfolio {
  name: string;
}

export interface Holding {
  symbol: string;
  quantity: number;
  avgCost: number;
}

export interface Trade {
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