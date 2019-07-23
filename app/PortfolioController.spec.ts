import { DBRef } from 'bson';
import { expect } from 'chai';
import mongoose from 'mongoose';
import * as DB from '../db';
import { getMockDateString } from '../spec/helpers/date';
import { withDb } from '../spec/helpers/db-connect';
import { PortfolioController } from './PortfolioController';
import { Portfolio, Trade } from './types';

describe('PortfolioController', withDb(() => {
    let controller: PortfolioController;

    beforeEach(function() {
        controller = new PortfolioController();
    });

    describe('creates a portfolio using a name', () => {
        const newPortfolioName = 'New Portfolio';
        let beforeCount: number, afterCount: number;
        let returned: any;

        beforeEach(async () => {
            // count before
            beforeCount = await DB.Portfolio.countDocuments();
            // create portfolio
            returned = await controller.createPortfolioWithName(newPortfolioName);
            // count after
            afterCount = await DB.Portfolio.countDocuments();
        });

        it('returns the created portfolio', () => {
            expect(returned).not.to.be.undefined;
        });

        it('creates the portfolio', () => {
            expect(afterCount).to.eq(beforeCount + 1);
        });
    });

    describe('get portfolios', () => {
        it('gets all portfolios', async () => {
            // create portfolios
            await DB.Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
            await DB.Portfolio.create({ name: 'New Portfolio 2', holding_ids: [] });
            // get existing
            const portfolios = await controller.getPortfolios();
            // expect two portfolios returned
            expect(portfolios.length).to.eq(2);
        });

        it('gets portfolio by id', async () => {
            // create portfolio
            const created = await DB.Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
            // get portfolio
            const portfolio = await controller.getPortfolioById(created.id);
            // expect portfolio to be defined
            expect(portfolio.id).to.eq(created.id);
        });
    });

    describe('delete portfolios', () => {
        describe('that exist', () => {
            let existing: Portfolio;
            beforeEach(async () => {
                existing = await controller.createPortfolioWithName('Test Portfolio');
            });
            it('should return the deleted portfolio', async () => {
                // delete portfolio
                const removed = await controller.deletePortfolioById(existing.id);
                // expect
                expect(removed).not.to.be.undefined;
                expect(removed.id).to.eq(existing.id);
            });
        });

        describe('that do not exist', () => {
            it('should return null', async () => {
                // delete non-existent portfolio
                const removed = await controller.deletePortfolioById('does not exist');
                // expect
                expect(removed).to.be.null;
            });
        });
    });

    xdescribe('add trade to portfolio', () => {
        const portfolio: Portfolio = {
            holdingIds: [],
            name: 'Test Portfolio',
            tradeIds: [],
        };
        const newTrade: Trade = {
            date: new Date(getMockDateString()),
            symbol: 'TEST',
            quantity: 5,
            price: 123.24,
            side: 'buy',
        };
        let savedPortfolio: Portfolio;

        beforeEach(async () => {
            savedPortfolio = await DB.Portfolio.create(portfolio);
        });

        describe('with a symbol that does not have a holding', () => {
            const performTest = async () => {
                await controller.addTradeToPortfolio(newTrade, savedPortfolio);
            };

            it('creates the trade', async () => {
                let preTradeCount: number, postTradeCount: number;
                // count before
                preTradeCount = await DB.Trade.countDocuments();
                // perform test
                performTest();
                // count after
                postTradeCount = await DB.Trade.countDocuments();
                // test
                expect(postTradeCount).to.eq(preTradeCount + 1);
            });

            it('creates a new holding', async () => {
                let preHoldingCount: number, postHoldingCount: number;
                // count before
                preHoldingCount = await DB.Holding.countDocuments();
                // perform test
                performTest();
                // count after
                postHoldingCount = await DB.Holding.countDocuments();
                // test
                expect(postHoldingCount).to.eq(preHoldingCount + 1);
            });

            it('adds the trade to the portfolio', async () => {
                let preCount: number, postCount: number;
                // count before
                preCount = savedPortfolio.tradeIds.length;
                // perform test
                performTest();
                // count after
                postCount = savedPortfolio.tradeIds.length;
                // test
                expect(postCount).to.eq(preCount + 1);
            });

            xit('adds holding to portfolio');
            xit('adds the trade to the holding');
            xit('updates the holding\'s data');
        });

        xdescribe('with a symbol that already has a holding in the portfolio', () => {
            xit('creates the trade', async () => {

            });
            xit('adds the trade to the holding');
            xit('updates the holding\'s data');
        });

        xdescribe('to a holding', () => {
            xit('that exists');
            xit('that does not exist');
        });
    });

    describe('get all Holdings for a Portfolio', () => {
      let portfolio: Portfolio;

      describe('when no Holdings exist', () => {
        beforeEach(async () => {
          // create test portfolio
          portfolio = await DB.Portfolio.create({
            name: 'Test Portfolio'
          });
          // don't create any holdings
        });
        it('returns empty array', async () => {
          const result = await controller.getHoldingsForPortfolio(portfolio);
          expect(result.length).to.eq(0);
        });
      });
    });

//     xdescribe('get all Holdings for Portfolio', () => {

//         xdescribe('when one or more Holdings exist', () => {
//             //             // create seed Holdings
// //             await Holding.create({ symbol: 'TEST' });
// //             await Holding.create({ symbol: 'TEST' });
// //             // get holdings
// //             const holdings = await controller.getHoldings();
// //             // expect there to be two
// //             expect(holdings.length).to.eq(2);
//             xit('returns all the Holdings');
//         });
//     });

//     xdescribe('get Holding by symbol', () => {
//         xdescribe('that exists', () => {
// //             let created, result;
// //             const newHolding = {
// //                 symbol: 'TEST',
// //                 quantity: 1,
// //                 cost: 50.23
// //             };

// //             beforeEach(async () => {
// //                 // create holding
// //                 created = await Holding.create(newHolding);

// //                 result = await controller.getHoldingBySymbol(newHolding.symbol);
// //             });
// //                 // test
// //                 expect(result).not.to.be.undefined;
//             xit('returns the Holding');
//         });
//         xdescribe('that does not exist', () => {
//             //                 const result = await controller.getHoldingBySymbol('RANDOM');
//             //                 // test
//             //                 expect(result).to.be.null;
//             xit('returns null');
//         });
//     });
}));
