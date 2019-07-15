const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const Trade = require('../db/trade/Trade');

describe('PortfolioController', () => {
    beforeEach(() => {

    });

    xdescribe('add trade', () => {
        xit('creates the trade', () => {

        });

        xdescribe('to a holding', () => {
           
            xit('that exists', () => {});
            xit('that does not exist', () => {});

        });
    });

    xdescribe('get holdings', () => {

        xit('all existing', () => {

        });

        xit('by symbol', () => {

        });
    });
});