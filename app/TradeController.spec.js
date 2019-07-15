const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const Trade = require('../db/trade/Trade');

describe('TradeController', () => {
    // it('', (done) => {
    //     const TradeMock = sinon.mock(Trade);
    //     const expectedResult = { status: true, todo: [] };
    //     TradeMock.expects('find').yields(null, expectedResult);
    //     Trade.find(function(err, result) {
    //         TradeMock.verify();
    //         TradeMock.restore();
    //         expect(result.status).to.be.true;
    //         done();
    //     });
    // });

    beforeEach(() => {

    })

    it('getTrades', () => {

    })
});