import chai, {expect} from 'chai';
import mongoose from 'mongoose';

import { withDb } from '../../spec/helpers/db-connect';
import { Holding, IHoldingDocument } from '../holding/Holding';
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
      await portfolio.addHolding(holding.id);
      //
      postcount = portfolio.holdingIds.length;
    });

    it('increases the length of the holdings array', () => {
      expect(postcount).to.eq(precount + 1);
    });
  });

//   it ('creates a Portfolio', async () => {

//   });

//   it ('gets a Portfolio by id', async () => {
//     const newPortfolio = {
//       name: 'Test portfolio',
//       holding_ids: []
//     };
//     // create portfolio
//     const createPortfolio = new Portfolio(newPortfolio);
//     await createPortfolio.save();
//     const id = createPortfolio._id;
//     // get by id
//     const result = await Portfolio.findById(id);
//     // test
//     expect(result).not.to.be.undefined;
//   });

//   xit ('gets all Portfolios', async () => {})
//   xit ('updates a Portfolio', async () => {})
//   xit ('deletes a Portfolio by id', async () => {})

}));
