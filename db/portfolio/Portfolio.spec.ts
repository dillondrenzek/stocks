import { expect } from 'chai';
import mongoose from 'mongoose';
import { withDb } from '../../spec/helpers/db-connect';
import { Portfolio } from './Portfolio';

// describe('Portfolio', withDb(() => {

// //   it ('creates a Portfolio', async () => {

// //   });

// //   it ('gets a Portfolio by id', async () => {
// //     const newPortfolio = {
// //       name: 'Test portfolio',
// //       holding_ids: []
// //     };
// //     // create portfolio
// //     const createPortfolio = new Portfolio(newPortfolio);
// //     await createPortfolio.save();
// //     const id = createPortfolio._id;
// //     // get by id
// //     const result = await Portfolio.findById(id);
// //     // test
// //     expect(result).not.to.be.undefined;
// //   });

// //   xit ('gets all Portfolios', async () => {})
// //   xit ('updates a Portfolio', async () => {})
// //   xit ('deletes a Portfolio by id', async () => {})

//   describe('adds a Trade', () => {

//     xit('creates the Trade');
//     xit('sets the ');
//   });

// }));
