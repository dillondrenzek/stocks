import * as Types from '../../../src/lib/types';

export interface Holding extends Types.Holding {}
export interface Portfolio extends Types.Portfolio {}

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