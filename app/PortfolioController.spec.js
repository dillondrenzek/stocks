const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const PortfolioController = require('./PortfolioController');
const { Portfolio, Trade, Holding } = require('../db');

describe('PortfolioController', () => {
    let controller;

    before((done) => {
        mongoose.connect('mongodb://localhost:27017/stocks-test', { useNewUrlParser: true });
        mongoose.connection.on('error', console.error.bind(console, 'connection error'));
        mongoose.connection.once('open', function() {
            done();
        });
    });

    beforeEach(() => {
        controller = new PortfolioController();
    });

    afterEach((done) => {
        mongoose.connection.db.dropDatabase(function() {
            done();
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(function() {
            mongoose.connection.close(done);
        });
    });

    describe('create portfolio', () => {

        it('creates the portfolio', async() => {
            const newPortfolio = {
                name: 'New Portfolio',
                holding_ids: []
            };
            // count before
            const preCount = await Portfolio.countDocuments();
            // create portfolio
            await controller.createPortfolio(newPortfolio);
            // count after
            const postCount = await Portfolio.countDocuments();
            // test
            expect(postCount).to.eq(preCount + 1);
        });

        it('returns the portfolio', async() => {
            const newPortfolio = {
                name: 'New Portfolio',
                holding_ids: []
            };
            // create portfolio

            const created = await controller.createPortfolio(newPortfolio);
            // test
            expect(created).not.to.be.undefined;
        });
    });

    describe('get portfolios', () => {
        it('gets all portfolios', async() => {
            // create portfolio
            await Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
            await Portfolio.create({ name: 'New Portfolio 2', holding_ids: [] });
            // get existing

            const portfolios = await controller.getPortfolios();
            // expect two portfolios returned
            expect(portfolios.length).to.eq(2);
        });

        it('gets portfolio by id', async() => {
            // create portfolio
            const created = await Portfolio.create({ name: 'New Portfolio 1', holding_ids: [] });
            // get portfolio

            const portfolio = await controller.getPortfolioById(created._id);
            // expect portfolio to be defined
            expect(portfolio.id).to.eq(created.id);
        });
    });

    describe('add trade to portfolio', () => {
        it('creates the trade', async() => {
            const newTrade = {
                symbol: 'TEST',
                quantity: 5,
                price: 123.24,
                side: 'buy',
            };
            // count before
            const preCount = await Trade.countDocuments();
            // add the trade
            await controller.addTrade(newTrade);
            // count after
            const postCount = await Trade.countDocuments();
            // test
            expect(postCount).to.eq(preCount + 1);
        });

        xdescribe('with a symbol that alreday has a holding in the portfolio', () => {
            const symbol = 'TEST';
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

    describe('create Holding', () => {
        it('returns the created Holding', async() => {
            const newHolding = {
                symbol: 'TEST',
                quantity: 31,
                cost: 29.73
            }
            const holding = await controller.createHolding(newHolding);
            expect(holding).not.to.be.undefined;
        });
    });

    describe('get Holdings', () => {
        it('all existing', async() => {
            // create seed Holdings
            await Holding.create({ symbol: 'TEST' });
            await Holding.create({ symbol: 'TEST' });
            // get holdings
            const holdings = await controller.getHoldings();
            // expect there to be two
            expect(holdings.length).to.eq(2);
        });
    });

    describe('get Holding by symbol', () => {
        describe('that exists', () => {
            let created, result;
            const newHolding = {
                symbol: 'TEST',
                quantity: 1,
                cost: 50.23
            };

            beforeEach(async() => {
                // create holding
                created = await Holding.create(newHolding);

                result = await controller.getHoldingBySymbol(newHolding.symbol);
            })
            it('returns the Holding', async() => {
                // test
                expect(result).not.to.be.undefined;
            });
            it('returns one holding', () => {
                expect(result.symbol).to.eq(newHolding.symbol);
            });
        });
        describe('that does not exist', () => {
            it('returns null', async() => {
                const result = await controller.getHoldingBySymbol('RANDOM');
                // test
                expect(result).to.be.null;
            });
        });
    });
});