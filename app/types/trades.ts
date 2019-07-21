export interface Trade {
  date: Date;
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  symbol: string;
}
