import { expect } from 'chai';
import mongoose from 'mongoose';
import { withDb } from '../../spec/helpers/db-connect';
import { ITradeDocument } from '../trade/Trade';
import { IPortfolioDocument, Portfolio } from './Portfolio';

describe('Portfolio', withDb(() => {

  describe('adds a trade', () => {
    let tradeId: ITradeDocument['_id'];
    let portfolio: IPortfolioDocument;

    beforeEach( async () => {
      portfolio = await Portfolio.create({
        name: 'Test Portfolio name'
      });
      tradeId = 'test-trade-id';
      await portfolio.addTrade(tradeId);
    });

    it('adds the trade\'s id to its trades', async () => {
      expect(portfolio.isModified()).to.eq(false);
      expect(portfolio.tradeIds).to.contain(tradeId);
    });

  });

}));
