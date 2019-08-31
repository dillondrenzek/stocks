import * as Types from '../../types';

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
    type: 'stock'
  }
}

export function defaultOptionTrade(): Types.OptionTransaction {
  return {
    price: 0,
    quantity: 0,
    side: null,
    symbol: '',
    type: 'option'
  }
}