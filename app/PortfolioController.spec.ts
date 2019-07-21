import chai from 'chai';
const expect = chai.expect;
import mongoose from 'mongoose';
require('sinon-mongoose');

// Importing our todo model for our unit testing.
import { Holding, Portfolio, Trade } from '../db';
import { PortfolioController } from './PortfolioController';
import { withDb } from '../spec/helpers/db-connect';

describe('PortfolioController', withDb('mongodb://localhost:27017/stocks-test', () => {
    let controller: PortfolioController;

    beforeEach(() => {
        controller = new PortfolioController();
    });

    xdescribe('creates a portfolio', () => {
        xit('creates the portfolio', async () => {
//             const newPortfolio = {
//                 name: 'New Portfolio',
//                 holding_ids: []
//             };
//             // count before
//             const preCount = await Portfolio.countDocuments();
//             // create portfolio
//             await controller.createPortfolio(newPortfolio);
//             // count after
//             const postCount = await Portfolio.countDocuments();
//             // test
//             expect(postCount).to.eq(preCount + 1);
        });
        xit('returns the portfolio', async () => {
//             const newPortfolio = {
//                 name: 'New Portfolio',
//                 holding_ids: []
//             };
//             // create portfolio

//             const created = await controller.createPortfolio(newPortfolio);
//             // test
//             expect(created).not.to.be.undefined;
        });
    });

    xdescribe('get portfolios', () => {
        xit('gets all portfolios', async () => {
//             // create portfolio
//             await Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
//             await Portfolio.create({ name: 'New Portfolio 2', holding_ids: [] });
//             // get existing

//             const portfolios = await controller.getPortfolios();
//             // expect two portfolios returned
//             expect(portfolios.length).to.eq(2);
        });

        xit('gets portfolio by id', async () => {
//             // create portfolio
//             const created = await Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
//             // get portfolio

//             const portfolio = await controller.getPortfolioById(created._id);
//             // expect portfolio to be defined
//             expect(portfolio.id).to.eq(created.id);
        });
    });

    xdescribe('add trade to portfolio', () => {
        xit('creates the trade', async () => {
//             const newTrade = {
//                 symbol: 'TEST',
//                 quantity: 5,
//                 price: 123.24,
//                 side: 'buy',
//             };
//             // count before
//             const preCount = await Trade.countDocuments();
//             // add the trade
//             await controller.addTrade(newTrade);
//             // count after
//             const postCount = await Trade.countDocuments();
//             // test
//             expect(postCount).to.eq(preCount + 1);
        });

        xdescribe('with a symbol that alreday has a holding in the portfolio', () => {
//             const symbol = 'TEST';
            xit('adds the trade to the holding', () => {});
            xit('updates the holding\'s data', () => {});
        });

        xdescribe('with a symbol that does not have a holding', () => {
            xit('creates a new holding', () => {});
            xit('adds holding to portfolio', () => {});
            xit('adds the trade to the holding', () => {});
            xit('updates the holding\'s data', () => {});
        });

        xdescribe('to a holding', () => {
            xit('that exists', () => {});
            xit('that does not exist', () => {});
        });
    });

    xdescribe('get all Holdings for Portfolio', () => {
        xdescribe('when no Holdings exist', () => {
            xit('returns empty array ', async () => {
            });
        });

        xdescribe('when one or more Holdings exist', () => {
            xit('returns all the Holdings', () => {
                //             // create seed Holdings
//             await Holding.create({ symbol: 'TEST' });
//             await Holding.create({ symbol: 'TEST' });
//             // get holdings
//             const holdings = await controller.getHoldings();
//             // expect there to be two
//             expect(holdings.length).to.eq(2);
            });
        });
    });

    xdescribe('get Holding by symbol', () => {
        xdescribe('that exists', () => {
//             let created, result;
//             const newHolding = {
//                 symbol: 'TEST',
//                 quantity: 1,
//                 cost: 50.23
//             };

//             beforeEach(async () => {
//                 // create holding
//                 created = await Holding.create(newHolding);

//                 result = await controller.getHoldingBySymbol(newHolding.symbol);
//             });
            xit('returns the Holding', async () => {
//                 // test
//                 expect(result).not.to.be.undefined;
            });
        });
        xdescribe('that does not exist', () => {
            xit('returns null', async () => {
//                 const result = await controller.getHoldingBySymbol('RANDOM');
//                 // test
//                 expect(result).to.be.null;
            });
        });
    });
}));

//     describe('create Holding', () => {
//         it('returns the created Holding', async () => {
//             const newHolding = {
//                 symbol: 'TEST',
//                 quantity: 31,
//                 cost: 29.73
//             };
//             const holding = await controller.createHolding(newHolding);
//             expect(holding).not.to.be.undefined;
//         });
//     });

// });
