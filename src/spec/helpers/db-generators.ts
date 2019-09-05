import * as Types from '../../lib/types';

export const generateHolding = (): Types.Holding => ({
  symbol: 'TEST',
  transactions: []
});

export const generateStockTransaction = (): Types.StockTransaction => ({
  type: 'stock',
  symbol: 'TEST',
  price: 3.33,
  quantity: 2,
  side: 'buy'
});

export const generateOptionTransaction = (): Types.OptionTransaction => ({
  type: 'option',
  symbol: 'TEST',
  price: 3.33,
  quantity: 2,
  side: 'buy',
  callPut: 'call',
  expirationDate: new Date(),
  strikePrice: 185.50
});