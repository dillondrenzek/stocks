import { Saveable } from './db';
import { Transaction } from './transaction';

export interface Portfolio extends Saveable {
  holdings: Holdings;
  name: string;
}

export interface Holdings {
  [symbol: string]: Holding
};

export interface Holding {
  symbol: string;
  transactions: Transaction[];
}

