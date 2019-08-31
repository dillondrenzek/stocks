import { Saveable } from './db';
import { Transaction } from './transaction';

export interface Portfolio extends Saveable {
  holdings: { 
    [symbol: string]: Holding 
  };
  name: string;
}

export interface FullPortfolio extends Portfolio {
  holdings: {
    [symbol: string]: FullHolding
  };
}

export interface Holding {
  symbol: string;
  transactions: string[] | Transaction[];
}

export interface FullHolding extends Holding {
  transactions: Transaction[];
}
