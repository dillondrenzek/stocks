import * as Types from '../../../src/types';

export interface Trade extends Types.Trade {}

export interface StockTrade extends Types.StockTrade {}

const defaultValues: StockTrade = {
  price: 0.00,
  quantity: 0,
  side: null,
  symbol: '',
  type: 'stock'
};

export class StockTrade {
  constructor(values: Partial<StockTrade> = defaultValues) {
    return Object.assign({}, defaultValues, values);
  }
}
