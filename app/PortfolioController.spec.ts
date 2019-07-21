import { expect } from 'chai';
import mongoose from 'mongoose';
import * as DB from '../db';
import { withDb } from '../spec/helpers/db-connect';
import { PortfolioController } from './PortfolioController';

describe('PortfolioController', withDb('mongodb://localhost:27017/stocks-test', () => {
    let controller: PortfolioController;

    beforeEach(function() {
        controller = new PortfolioController();
    });

    describe('creates a portfolio using a name', () => {

        it('creates the portfolio', async () => {
            const newPortfolioName = 'New Portfolio';
            // count before
            const initialCount = await DB.Portfolio.countDocuments();
            // create portfolio
            await controller.createPortfolioWithName(newPortfolioName);
            // count after
            const postCount = await DB.Portfolio.countDocuments();
            // test
            expect(postCount).to.eq(initialCount + 1);
        });
        xit('returns the portfolio');
    });

    xdescribe('get portfolios', () => {
        //             // create portfolio
        //             await Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
        //             await Portfolio.create({ name: 'New Portfolio 2', holding_ids: [] });
        //             // get existing

        //             const portfolios = await controller.getPortfolios();
        //             // expect two portfolios returned
        //             expect(portfolios.length).to.eq(2);
        xit('gets all portfolios');

        //             // create portfolio
        //             const created = await Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
        //             // get portfolio

        //             const portfolio = await controller.getPortfolioById(created._id);
        //             // expect portfolio to be defined
        //             expect(portfolio.id).to.eq(created.id);
        xit('gets portfolio by id');
    });

    xdescribe('add trade to portfolio', () => {
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
        xit('creates the trade');

        xdescribe('with a symbol that alreday has a holding in the portfolio', () => {
//             const symbol = 'TEST';
            xit('adds the trade to the holding');
            xit('updates the holding\'s data');
        });

        xdescribe('with a symbol that does not have a holding', () => {
            xit('creates a new holding');
            xit('adds holding to portfolio');
            xit('adds the trade to the holding');
            xit('updates the holding\'s data');
        });

        xdescribe('to a holding', () => {
            xit('that exists');
            xit('that does not exist');
        });
    });

    xdescribe('get all Holdings for Portfolio', () => {
        xdescribe('when no Holdings exist', () => {
            xit('returns empty array ');
        });

        xdescribe('when one or more Holdings exist', () => {
            //             // create seed Holdings
//             await Holding.create({ symbol: 'TEST' });
//             await Holding.create({ symbol: 'TEST' });
//             // get holdings
//             const holdings = await controller.getHoldings();
//             // expect there to be two
//             expect(holdings.length).to.eq(2);
            xit('returns all the Holdings');
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
//                 // test
//                 expect(result).not.to.be.undefined;
            xit('returns the Holding');
        });
        xdescribe('that does not exist', () => {
            //                 const result = await controller.getHoldingBySymbol('RANDOM');
            //                 // test
            //                 expect(result).to.be.null;
            xit('returns null');
        });
    });
}));
