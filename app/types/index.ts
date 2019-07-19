export interface Holding {
  cost: number;
  portfolioId: string;
  quantity: number;
  symbol: string;
  tradeIds: string[];
}

export interface Portfolio {
  holdingIds: string[];
  name: string;
}

export interface Trade {
  date: Date;
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  symbol: string;
}
