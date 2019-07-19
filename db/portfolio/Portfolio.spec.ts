import chai from 'chai';
const expect = chai.expect;

import mongoose from 'mongoose';
require('sinon-mongoose');

import {Portfolio} from './Portfolio';

// describe('Portfolio', () => {
//   let db;

//   before((done) => {
//     mongoose.connect('mongodb://localhost:27017/stocks-test', { useNewUrlParser: true });
//     mongoose.connection.on('error', console.error.bind(console, 'connection error'));
//     mongoose.connection.once('open', function () {
//       done();
//     });
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropDatabase(function() {
//       done();
//     });
//   });

//   after((done) => {
//     mongoose.connection.db.dropDatabase(function () {
//       mongoose.connection.close(done);
//     });
//   });

//   it ('creates a Portfolio', async () => {

//   });

//   it ('gets a Portfolio by id', async () => {
//     const newPortfolio = {
//       name: 'Test portfolio',
//       holding_ids: []
//     };
//     // create portfolio
//     const createPortfolio = new Portfolio(newPortfolio);
//     await createPortfolio.save();
//     const id = createPortfolio._id;
//     // get by id
//     const result = await Portfolio.findById(id);
//     // test
//     expect(result).not.to.be.undefined;
//   });

//   xit ('gets all Portfolios', async () => {})
//   xit ('updates a Portfolio', async () => {})
//   xit ('deletes a Portfolio by id', async () => {})

// });
