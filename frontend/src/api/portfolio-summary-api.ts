import http from '../lib/http';
import { PortfolioSummaryItem } from '../../../robinhood-pdf/models/portfolio-summary';

export const PortfolioSummaryApi = {
  getPortfolioSummary: (cb: (items: PortfolioSummaryItem[]) => void) => {
    http.get('http://localhost:7000/api/portfolio-summary')
      .then((res) => cb(res.data))
      .catch(console.error);
  }
};
