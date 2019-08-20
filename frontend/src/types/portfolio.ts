import * as Types from '../../../src/types';

export interface Holding extends Types.Holding {}

export interface Portfolio extends Types.Portfolio {}

const defaultValues: Portfolio = {
  name: '',
  holdings: [],
  stockTrades: [],
  optionTrades: []
};

export class Portfolio {
  constructor(values: Partial<Portfolio> = defaultValues) {
    return Object.assign({}, defaultValues, values);
  }
}