import * as Types from '../../lib/types';

export const generateHolding = (): Types.Holding => ({
  symbol: 'TEST',
  optionTransactions: [],
  stockTransactions: []
});

export const generateStockTransaction = (): Types.StockTransaction => ({
  type: 'stock',
  symbol: 'TEST',
  price: 3.33,
  quantity: 2,
  side: 'buy',
  date: new Date(),
});

export const generateOptionTransaction = (): Types.OptionTransaction => ({
  type: 'option',
  symbol: 'TEST',
  price: 3.33,
  quantity: 2,
  side: 'buy',
  callPut: 'call',
  expirationDate: new Date(),
  strikePrice: 185.50,
  date: new Date()
});