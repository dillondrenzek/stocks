const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const PortfolioController = require('./PortfolioController');
const { Portfolio, Trade } = require('../db');

describe('PortfolioController', () => {
    let controller;

    before((done) => {
        mongoose.connect('mongodb://localhost:27017/stocks-test', { useNewUrlParser: true });
        mongoose.connection.on('error', console.error.bind(console, 'connection error'));
        mongoose.connection.once('open', function () {
            done();
        });
    });

    afterEach((done) => {
        mongoose.connection.db.dropDatabase(function() {
            done();
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(function () {
        mongoose.connection.close(done);
        });
    });

    describe('create portfolio', () => {

        it ('creates the portfolio', async () => {
            const newPortfolio = {
                name: 'New Portfolio',
                holding_ids: []
            };
            // count before
            const preCount = await Portfolio.countDocuments();
            // create portfolio
            controller = new PortfolioController();
            await controller.createPortfolio(newPortfolio);
            // count after
            const postCount = await Portfolio.countDocuments();
            // test
            expect(postCount).to.eq(preCount + 1);
        });

        it ('returns the portfolio', async () => {
            const newPortfolio = {
                name: 'New Portfolio',
                holding_ids: []
            };
            // create portfolio
            controller = new PortfolioController();
            const created = await controller.createPortfolio(newPortfolio);
            // test
            expect(created).not.to.be.undefined;
        });
    });

    describe('get portfolios', () => {
        it ('gets all portfolios', async () => {
            // create portfolio
            await Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
            await Portfolio.create({ name: 'New Portfolio 2', holding_ids: [] });
            // get existing
            controller = new PortfolioController();
            const portfolios = await controller.getPortfolios();
            // expect two portfolios returned
            expect(portfolios.length).to.eq(2);
        });

        it ('gets portfolio by id', async () => {
            // create portfolio
            const created = await Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
            // get portfolio
            controller = new PortfolioController();
            const portfolio = await controller.getPortfolioById(created._id);
            // expect portfolio to be defined
            expect(portfolio.id).to.eq(created.id);
        });
    });

    describe('add trade', () => {
        it('creates the trade', async () => {
            const newTrade = {
                symbol: 'TEST',
                quantity: 5,
                price: 123.24,
                side: 'buy',
            };
            // count before
            const preCount = await Trade.countDocuments();
            // create portfolio
            controller = new PortfolioController();
            await controller.addTrade(newTrade);
            // count after
            const postCount = await Trade.countDocuments();
            // test
            expect(postCount).to.eq(preCount + 1);
        });

        xdescribe('with a symbol that has a holding', () => {
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

    xdescribe('get Holdings', () => {
        xit('all existing', () => {});
        xit('by symbol', () => {});
    });

    xdescribe('get Holding by symbol', () => {
        xdescribe('that exists', () => {
            xit('returns the Holding', () => {

            });
        });
        xdescribe('that does not exist', () => {
            xit('returns null', () => {

            });
        });
    });
});