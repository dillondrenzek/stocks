import * as DB from '../../db';

export interface Portfolio extends Partial<DB.IPortfolioDocument> {
  // holdingIds: string[];
  // name: string;
  // tradeIds: string[];
}
