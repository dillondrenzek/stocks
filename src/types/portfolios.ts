import {Saveable} from './db';

export interface Portfolio extends Saveable {
  holdings: Holding[];
  name: string;
  stockTrades: string[];
  optionTrades: string[];
}

export interface Holding {
  symbol: string;
  quantity: number;
  avgCost: number;
  transactions: string[]; // id
}
