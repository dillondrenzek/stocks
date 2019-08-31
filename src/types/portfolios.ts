import { Saveable } from './db';

export interface Portfolio extends Saveable {
  holdings: { 
    [symbol: string]: Holding 
  };
  name: string;
}

export interface Holding {
  symbol: string;
  transactions: string[]; // id
}
