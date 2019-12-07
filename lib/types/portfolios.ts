import { Saveable } from './db';

export interface Portfolio extends Saveable {
  holdings: Holdings;
  name: string;
}

export interface Holdings {
  [symbol: string]: Holding;
}

export interface Holding {
  symbol: string;
  stockTransactions: string[];
  optionTransactions: string[];
}
