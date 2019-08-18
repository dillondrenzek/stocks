import * as Types from '../../types';

export function defaultPortfolio(): Types.Portfolio {
  return {
    holdings: [],
    name: '',
    optionTrades: [],
    stockTrades: []
  }
}

export function defaultStockTrade(): Types.StockTrade {
  return {
    price: 0,
    quantity: 0,
    side: null,
    symbol: '',
    type: 'stock'
  }
}

export function defaultOptionTrade(): Types.OptionTrade {
  return {
    price: 0,
    quantity: 0,
    side: null,
    symbol: '',
    type: 'option'
  }
}