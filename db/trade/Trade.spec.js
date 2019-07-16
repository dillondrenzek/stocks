const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const Trade = require('./Trade');

describe('Trade', () => {
    it ('gets Trades', (done) => {
        const TradeMock = sinon.mock(Trade);
        const expectedResult = { status: true, todo: [] };
        TradeMock.expects('find').yields(null, expectedResult);
        Trade.find(function(err, result) {
            TradeMock.verify();
            TradeMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    xit ('gets a Trade by id', () => {});
    xit ('creates a Trade', () => {});
    xit ('updates a Trade', () => {});
    xit ('deletes a Trade by id', () => {});

});