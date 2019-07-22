import { expect } from 'chai';
import mongoose from 'mongoose';
import { withDb } from '../../spec/helpers/db-connect';
import { ITradeDocument, Trade } from './Trade';

describe('Trade', withDb(() => {

  describe('adds a portfolio', () => {
    let portfolioId: string;
    let trade: ITradeDocument;

    beforeEach(async () => {
      trade = await Trade.create({
        symbol: 'TEST',
        quantity: 12,
        price: 123.23
      });
      portfolioId = 'portfolio-id';
      await trade.addToPortfolio(portfolioId);

    });

    it('has a portfolio id after save', () => {
      const isModified = trade.isModified();
      expect(isModified).to.be.false;
      expect(trade.portfolioId).to.eq(portfolioId);
    });

  });

}));
