import * as Types from '../../lib/types';

export function defaultPortfolio(): Types.Portfolio {
  return {
    holdings: {},
    name: '',
  }
}

export function defaultStockTrade(): Types.StockTransaction {
  return {
    price: 0,
    quantity: 0,
    side: null,
    symbol: '',
    type: 'stock',
    date: new Date(),
  }
}

export function defaultOptionTrade(): Types.OptionTransaction {
  return {
    price: 0,
    quantity: 0,
    side: null,
    symbol: '',
    callPut: null,
    expirationDate: new Date(),
    strikePrice: 0,
    type: 'option',
    date: new Date(),
  }
}