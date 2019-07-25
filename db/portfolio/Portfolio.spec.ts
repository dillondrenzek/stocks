import chai, {expect} from 'chai';
import mongoose from 'mongoose';

import { withDb } from '../../spec/helpers/db-connect';
import { Holding, IHoldingDocument } from '../holding/Holding';
import { ITradeDocument } from '../trade/Trade';
import { IPortfolioDocument, Portfolio } from './Portfolio';

describe('Portfolio', withDb(() => {
  let portfolio: IPortfolioDocument;

  describe('adds a Holding', () => {
    let precount: number,
      postcount: number,
      holding: IHoldingDocument;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create({
        name: 'Test Portfolio',
        holdingIds: [],
        tradeIds: []
      });
      // create test holding
      holding = await Holding.create({
        cost: 0.00,
        portfolioId: null,
        quantity: 0.00,
        symbol: 'TEST',
        tradeIds: [],
      });
      //
      precount = portfolio.holdingIds.length;
      // perform test
      await portfolio.addHolding(holding);
      //
      postcount = portfolio.holdingIds.length;
    });

    it('increases the length of the holdings array', () => {
      expect(postcount).to.eq(precount + 1);
    });
  });

  xdescribe('adds a Trade', () => {
    let precount: number,
      postcount: number,
      trade: ITradeDocument;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create({
        name: 'Test Portfolio',
        holdingIds: [],
        tradeIds: []
      });
      // create test holding
      // trade = await Trade.create({
      //   cost: 0.00,
      //   portfolioId: null,
      //   quantity: 0.00,
      //   symbol: 'TEST',
      //   tradeIds: [],
      // });
      //
      precount = portfolio.tradeIds.length;
      // perform test
      await portfolio.addTrade(trade);
      //
      postcount = portfolio.tradeIds.length;
    });

    it('increases the length of the trades array', () => {
      expect(postcount).to.eq(precount + 1);
    });
  });

}));
