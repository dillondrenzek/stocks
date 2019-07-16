const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const Holding = require('./Holding');

describe('Holding', () => {
    let conn;
    let db;

    beforeEach((done) => {
        conn = mongoose.connect('mongodb://localhost:27017/stocks-test', { useNewUrlParser: true });
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            done();
        });
    });

    afterEach((done) => {
        db.db.dropDatabase(function () {
            db.close(done);
        });
    });

    it('creates a Holding', async () => {
        const newHolding = new Holding({
            cost: 0,
            quantity: 0,
            symbol: 'TEST'
        });
        const numHoldings = await Holding.countDocuments();
        await newHolding.save();
        const numHoldingsAfter = await Holding.countDocuments();
        expect(numHoldingsAfter).to.equal(numHoldings + 1);
    });

    it('gets Holding by symbol', async () => {
        const newHolding = {
            cost: 0,
            quantity: 0,
            symbol: 'TEST'
        };
        const createdHolding = new Holding(newHolding);
        await createdHolding.save();
        const found = await Holding.findBySymbol(newHolding.symbol);
        expect(found.length).to.equal(1);
    });

    it('gets Holdings', (done) => {
        const HoldingMock = sinon.mock(Holding);
        const expectedResult = {
            status: true,
            todo: []
        };
        HoldingMock.expects('find').yields(null, expectedResult);
        Holding.find(function (err, result) {
            HoldingMock.verify();
            HoldingMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    xit ('gets a Holding by id', () => {});
    xit ('updates a Holding', () => {});
    xit ('deletes a Holding by id', () => {});
});