import http from '../lib/http';
import {
  Portfolio,
  Transaction,
} from '../types';

export const PortfolioAPI = {

  createPortfolio: (portfolio: Portfolio, cb?: () => void): Promise<void> => {
    const url = 'http://localhost:7000/api/portfolios';
    const params = new URLSearchParams();
    Object.keys(portfolio).forEach((key) => {
      params.append(key, portfolio[key].toString());
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return http.post(url, params, config)
      // .then(cb)
      // .catch(console.error);
  },

  // TODO: Reimplement

  addTradeToPortfolio: (tx: Transaction, portfolioId: string, cb: (updatedPortfolio: Portfolio) => void) => {
    const url = 'http://localhost:7000/api/portfolios/' + portfolioId + '/transactions';
    const params = new URLSearchParams();

    Object.keys(tx).forEach((key) => {
      params.append(key, tx[key].toString());
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    http.post<Portfolio>(url, params, config)
      .then((res) => cb(res.data))
      .catch(console.error);
  },

  removeTradeFromPortfolio: (txId: string, portfolioId: string, cb: (updatedPortfolio: Portfolio) => void) => {
    const url = 'http://localhost:7000/api/portfolios/' + portfolioId + '/transactions/' + txId + '/delete';
    
    http.post<Portfolio>(url, null, null)
      .then((res) => cb(res.data))
      .catch(console.error);
  },

  getPortfolios: (cb: (portfolios: Portfolio[]) => void) => {
    http.get<Portfolio[]>('http://localhost:7000/api/portfolios')
      .then((res) => cb(res.data))
      .catch(console.error);
  },

  getPortfolioById: (id: string, cb: (portfolio: Portfolio) => void) => {
    http.get<Portfolio>('http://localhost:7000/api/portfolios/' + id)
      .then((res) => cb(res.data))
      .catch(console.error);
  },

  // getStockTradesForPortfolio: (id: string, cb: (trades: StockTrade[]) => void) => {
  //   http.get<StockTrade[]>('http://localhost:7000/api/portfolios/' + id + '/trades/stock')
  //     .then((res) => cb(res.data))
  //     .catch(console.error);
  // },

  // deleteTradeFromPortfolio: (trade: StockTrade, portfolioId: string, cb: () => void) => {
  //   http.post('http://localhost:7000/api/portfolios/' + portfolioId + '/trades/' + trade._id + '/delete')
  //     .then(() => cb())
  //     .catch(console.error);
  // },

  // deletePortfolio: (portfolio: Portfolio, cb: () => void) => {
  //   http.post('http://localhost:7000/api/portfolios/' + portfolio._id + '/delete')
  //     .then(() => cb())
  //     .catch(console.error);
  // }

};
