import { expect } from 'chai';
import mongoose from 'mongoose';
import { withDb } from '../../spec/helpers/db-connect';
import { ITradeDocument, Trade } from './Trade';

describe('Trade', withDb(() => {

//     xit ('gets Trades', (done) => {
//         const TradeMock = sinon.mock(Trade);
//         const expectedResult = { status: true, todo: [] };
//         TradeMock.expects('find').yields(null, expectedResult);
//         Trade.find(function(err, result) {
//             TradeMock.verify();
//             TradeMock.restore();
//             expect(result.status).to.be.true;
//             done();
//         });
//     });

//     xit ('gets a Trade by id', () => {});
//     xit ('creates a Trade', () => {});
//     xit ('updates a Trade', () => {});
//     xit ('deletes a Trade by id', () => {});

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
