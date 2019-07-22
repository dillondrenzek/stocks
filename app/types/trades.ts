export interface Trade {
  _id?: string;
  date: Date;
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  symbol: string;
}
