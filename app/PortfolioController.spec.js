const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
const PortfolioController = require('./PortfolioController');
const { Portfolio } = require('../db');

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

        it ('creates the trade', async () => {
            const newPortfolioName = 'Test portfolio';
            // count before
            const preCount = await Portfolio.countDocuments();
            // create portfolio
            controller = new PortfolioController(newPortfolioName);
            await controller.createPortfolio();
            // const createPortfolio = new Portfolio(newPortfolio);
            // await createPortfolio.save();
            // count after
            const postCount = await Portfolio.countDocuments();
            // test
            expect(postCount).to.eq(preCount + 1);
        })
    });

    // xdescribe('add trade', () => {
    //     xit('creates the trade', () => {

    //     });

    //     xdescribe('to a holding', () => {
           
    //         xit('that exists', () => {});
    //         xit('that does not exist', () => {});

    //     });
    // });

    // xdescribe('get holdings', () => {

    //     xit('all existing', () => {

    //     });

    //     xit('by symbol', () => {

    //     });
    // });
});