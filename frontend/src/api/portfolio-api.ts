import http from '../lib/http';
import { Portfolio } from '../types/portfolio';
import { StockTrade } from '../types/trade';

export const PortfolioAPI = {

  addTradeToPortfolio: (trade: StockTrade, portfolioId: string, cb: () => void) => {
    const url = 'http://localhost:7000/api/portfolios/' + portfolioId + '/trades';
    const params = new URLSearchParams();
    Object.keys(trade).forEach((key) => {
      params.append(key, trade[key].toString());
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    http.post(url, params, config)
      .then(cb)
      .catch(console.error);
  },

  getPortfolios: (cb: (portfolios: Portfolio[]) => void) => {
    http.get<Portfolio[]>('http://localhost:7000/api/portfolios')
      .then((res) => cb(res.data))
      .catch(console.error);
  },

  getStockTradesForPortfolio: (id: string, cb: (trades: StockTrade[]) => void) => {
    http.get<StockTrade[]>('http://localhost:7000/api/portfolios/' + id + '/trades/stock')
      .then((res) => cb(res.data))
      .catch(console.error);
  },

  deleteTradeFromPortfolio: (trade: StockTrade, portfolioId: string, cb: () => void) => {
    http.post('http://localhost:7000/api/portfolios/' + portfolioId + '/trades/' + trade._id + '/delete')
      .then(() => cb())
      .catch(console.error);
  }

};
