const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const Holding = require('./Holding');

describe('Holding', () => {
    let conn;

    before((done) => {
        conn = mongoose.connect('mongodb://localhost:27017/stocks-test', {
            useNewUrlParser: true
        });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });

    describe('Holding', () => {
            it.only('creates a Holding', async () => {
                const numHoldings = await Holding.countDocuments();
                const newHolding = new Holding({
                    
                });

                await newHolding.save();
                const numHoldingsAfter = await Holding.countDocuments();
                expect(numHoldingsAfter).to.equal(numHoldings + 1);
                // done();
                // const 
                // newHolding.save().then(() => {
                // }, () =>  {
                //     const numHoldingsAfter = Holding.count();
                //     expect(numHoldingsAfter).to.equal(numHoldings + 1);
                // }).finally(() => {
                //     done();
                // });
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
    });
});