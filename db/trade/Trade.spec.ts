import chai from 'chai';
const expect = chai.expect;
import mongoose from 'mongoose';
require('sinon-mongoose');

// Importing our todo model for our unit testing.
import {Trade} from './Trade';

// describe('Trade', () => {
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
//         db.db.dropDatabase(function () {
//             db.close(done);
//         });
//     });

//     xit ('gets Trades', (done) => {
//         const TradeMock = sinon.mock(Trade);
//         const expectedResult = { status: true, todo: [] };
//         TradeMock.expects('find').yields(null, expectedResult);
//         Trade.find(function(err, result) {
//             TradeMock.verify();
//             TradeMock.restore();
//             expect(result.status).to.be.true;
//             done();
//         });
//     });

//     xit ('gets a Trade by id', () => {});
//     xit ('creates a Trade', () => {});
//     xit ('updates a Trade', () => {});
//     xit ('deletes a Trade by id', () => {});

// });
