export interface Trade {
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  symbol: string;
  timestamp: Date;
  type: 'stock' | 'option';
}

export interface StockTrade extends Trade {
  type: 'stock';
}
