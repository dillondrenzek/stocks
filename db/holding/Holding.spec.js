const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');



//Importing our todo model for our unit testing.
const Holding = require('./Holding');
const Trade = require('../trade/Trade');
const Portfolio = require('../portfolio/Portfolio');

describe('Holding', () => {

    before((done) => {
        mongoose.connect('mongodb://localhost:27017/stocks-test', { useNewUrlParser: true });
        mongoose.connection.on('error', console.error.bind(console, 'connection error'));
        mongoose.connection.once('open', function() {
            done();
        });
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

    describe('adds a trade', () => {
        const newTrade = {
            symbol: 'TEST',
            quantity: 12,
            cost: 95
        };
        const newHolding = {
            symbol: 'TEST',
            quantity: 123,
            cost: 100
        };
        let holding, trade;

        beforeEach(async() => {
            holding = await Holding.create(newHolding);
            trade = await Trade.create(newTrade);
            await holding.addTrade(trade.id);
        });

        it('adds trade id to trade id array', async() => {
            expect(holding.trade_ids[0]).to.eq(trade.id);
        });

        it('saves trade id to trade id array', async() => {
            const getHolding = await Holding.findById(holding.id);
            expect(getHolding.trade_ids[0]).to.eq(trade.id);
        });
    });

    describe('adds a portfolio', () => {
        const newPortfolio = {
            name: 'Portfolio 1',
            holding_ids: []
        };
        const newHolding = {
            symbol: 'TEST',
            quantity: 123,
            cost: 100
        };
        let holding, portfolio;

        beforeEach(async() => {
            holding = await Holding.create(newHolding);
            portfolio = await Portfolio.create(newPortfolio);
            await holding.addPortfolio(portfolio.id);
        });

        it('sets portfolio id', async() => {
            expect(holding.portfolio_id).to.eq(portfolio.id);
        });

        it('saves portfolio id', async() => {
            const getHolding = await Holding.findById(holding.id);
            expect(getHolding.portfolio_id).to.eq(portfolio.id);
        });
    });

});

// describe('Holding', () => {
//     let conn;
//     let db;

//     beforeEach(() => {
//         conn = mongoose.connect('mongodb://localhost:27017/stocks-test', {
//             useNewUrlParser: true
//         });
//         db = mongoose.connection;
//         db.on('error', console.error.bind(console, 'connection error'));
//         db.once('open', function () {
//             done();
//         });
//     });

//     afterEach((done) => {
//         db.dropDatabase(function () {
//             db.close(done);
//         });
//     });

//     xit('creates a Holding', async () => {
//         const newHolding = new Holding({
//             cost: 0,
//             quantity: 0,
//             symbol: 'TEST'
//         });
//         const numHoldings = await Holding.countDocuments();
//         await newHolding.save();
//         const numHoldingsAfter = await Holding.countDocuments();
//         expect(numHoldingsAfter).to.equal(numHoldings + 1);
//     });

//     xit('gets Holding by symbol', async () => {
//         const newHolding = {
//             cost: 0,
//             quantity: 0,
//             symbol: 'TEST'
//         };
//         const createdHolding = new Holding(newHolding);
//         await createdHolding.save();
//         const found = await Holding.findBySymbol(newHolding.symbol);
//         expect(found.length).to.equal(1);
//     });

//     xit('gets Holdings', (done) => {
//         const HoldingMock = sinon.mock(Holding);
//         const expectedResult = {
//             status: true,
//             todo: []
//         };
//         HoldingMock.expects('find').yields(null, expectedResult);
//         Holding.find(function (err, result) {
//             HoldingMock.verify();
//             HoldingMock.restore();
//             expect(result.status).to.be.true;
//             done();
//         });
//     });

//     xit ('gets a Holding by id', () => {});
//     xit ('updates a Holding', () => {});
//     xit ('deletes a Holding by id', () => {});
// });