import { StockTransaction, OptionTransaction } from './transaction';

export interface Portfolio {
  _id?: string;
  holdings: Holdings;
  name: string;
}

export interface Holdings {
  [symbol: string]: Holding;
}

export interface Holding {
  symbol: string;
  stockTransactions: StockTransaction[];
  optionTransactions: OptionTransaction[];
}


const defaultValues: Portfolio = {
  name: '',
  holdings: {},
};

export class Portfolio {
  static get defaultValues() {
    return Object.assign({}, defaultValues);
  }

  constructor(values: Partial<Portfolio> = defaultValues) {
    return Object.assign({}, Portfolio.defaultValues, values);
  }
}