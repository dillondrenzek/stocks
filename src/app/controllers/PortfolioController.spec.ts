// // import { expect } from 'chai';
// // import * as DB from '../../db';
// import { withDb } from '../../spec/helpers/db-connect';
// import { PortfolioController } from './PortfolioController';
// // import { Portfolio, Trade, StockTrade, BuyOrSell, Holding } from '../../types';
// // // import {generateStockTrade} from '../../spec/helpers/type-defaults';

// // const generateStockTrade = (side: BuyOrSell = 'buy'): StockTrade => {
// //   return {
// //     price: Math.random() * 300,
// //     quantity: Math.floor(Math.random() * 100),
// //     side,
// //     symbol: 'TEST',
// //     type: 'stock'
// //   }
// // }


// describe('PortfolioController', withDb(() => {
//   // let controller: PortfolioController;

//   // beforeEach(function () {
//   //   controller = new PortfolioController();
//   // });

//   describe('creates a portfolio using a name', () => {
//     const newPortfolioName = 'New Portfolio';
//     let beforeCount: number, afterCount: number;
//     let returned: any;

//     beforeEach(async () => {
//       // count before
//       beforeCount = await DB.Portfolio.countDocuments();
//       // create portfolio
//       returned = await controller.createPortfolioWithName(newPortfolioName);
//       // count after
//       afterCount = await DB.Portfolio.countDocuments();
//     });

//     it('returns the created portfolio', () => {
//       expect(returned).not.to.be.undefined;
//       expect(afterCount).to.eq(beforeCount + 1);
//     });
//   });

// //   describe('get portfolios', () => {
// //     it('gets all portfolios', async () => {
// //       // create portfolios
// //       await DB.Portfolio.createByName('New Portfolio 1');
// //       await DB.Portfolio.createByName('New Portfolio 2');
// //       // get existing
// //       const portfolios = await controller.getPortfolios();
// //       // expect two portfolios returned
// //       expect(portfolios.length).to.eq(2);
// //     });

// //     it('gets portfolio by id', async () => {
// //       // create portfolio
// //       const created = await DB.Portfolio.createByName('New Portfolio 1'); 
// //       // get portfolio
// //       const portfolio = await controller.getPortfolioById(created.id);
// //       // expect portfolio to be defined
// //       expect(portfolio.id).to.eq(created.id);
// //     });
// //   });

// //   describe('delete portfolios', () => {
// //     describe('that exist', () => {
// //       let existing: DB.IPortfolioDocument;
// //       beforeEach(async () => {
// //         existing = await DB.Portfolio.createByName('Test Portfolio');
// //       });
// //       it('should return the deleted portfolio', async () => {
// //         // delete portfolio
// //         const removed = await controller.deletePortfolioById(existing.id);
// //         // expect
// //         expect(removed).not.to.be.undefined;
// //         expect(removed.id).to.eq(existing.id);
// //       });
// //     });

// //     describe('that do not exist', () => {
// //       it('should return null', async () => {
// //         // delete non-existent portfolio
// //         const removed = await controller.deletePortfolioById('does not exist');
// //         // expect
// //         expect(removed).to.be.null;
// //       });
// //     });
// //   });

// //   describe('add stock trade to portfolio', () => {
// //     let newTrade: StockTrade;
// //     let savedPortfolio: DB.IPortfolioDocument;
// //     let preDocumentCount: number, postDocumentCount: number;
// //     let preTradeCount: number, postTradeCount: number;
// //     let preHoldingsCount: number, postHoldingsCount: number;

// //     beforeEach(async () => {
// //       newTrade = generateStockTrade();
// //       // create the test portfolio
// //       savedPortfolio = await DB.Portfolio.createByName('Test');
// //     });

// //     describe('with a symbol that does not have a holding', () => {

// //       beforeEach(async () => {
// //         // count before
// //         preDocumentCount = await DB.StockTrade.countDocuments();
// //         preTradeCount = savedPortfolio.stockTrades.length;
// //         preHoldingsCount = savedPortfolio.holdings.length;
// //         // perform test
// //         await controller.addTradeToPortfolio(newTrade, savedPortfolio.id);
// //         savedPortfolio = await DB.Portfolio.findById(savedPortfolio.id);
// //         // count after
// //         postDocumentCount = await DB.StockTrade.countDocuments();
// //         postTradeCount = savedPortfolio.stockTrades.length;
// //         postHoldingsCount = savedPortfolio.holdings.length;
// //       });

// //       it('creates the StockTrade', () => {
// //         expect(postDocumentCount).to.eq(preDocumentCount + 1);
// //       });

// //       it('adds the trade to the portfolio', () => {
// //         expect(postTradeCount).to.eq(preTradeCount + 1);
// //       });

// //       it('adds a new Holding', () => {
// //         expect(postHoldingsCount).to.eq(preHoldingsCount + 1);
// //         expect(savedPortfolio.holdings.find((h) => h.symbol === newTrade.symbol)).not.to.be.undefined;
// //       });

// //     });

// //     describe('with a symbol that already has a holding', () => {
// //       let anotherTrade: StockTrade;
// //       let existingHolding: Holding, updatedHolding: Holding;

// //       beforeEach(async () => {
// //         newTrade = generateStockTrade();
// //         anotherTrade = generateStockTrade();
// //         // add first trade
// //         await controller.addTradeToPortfolio(newTrade, savedPortfolio.id);
// //         savedPortfolio = await DB.Portfolio.findById(savedPortfolio.id);
// //         existingHolding = savedPortfolio.getHoldingBySymbol(newTrade.symbol);
// //         // count before
// //         preDocumentCount = await DB.StockTrade.countDocuments();
// //         preTradeCount = savedPortfolio.stockTrades.length;
// //         preHoldingsCount = savedPortfolio.holdings.length;
// //         // perform test
// //         // add another trade with the same symbol
// //         anotherTrade.symbol = newTrade.symbol;
// //         await controller.addTradeToPortfolio(anotherTrade, savedPortfolio.id);
// //         savedPortfolio = await DB.Portfolio.findById(savedPortfolio.id);
// //         updatedHolding = savedPortfolio.getHoldingBySymbol(newTrade.symbol);
// //         // count after
// //         postDocumentCount = await DB.StockTrade.countDocuments();
// //         postTradeCount = savedPortfolio.stockTrades.length;
// //         postHoldingsCount = savedPortfolio.holdings.length;
// //       });

// //       it('creates the StockTrade', () => {
// //         expect(postDocumentCount).to.eq(preDocumentCount + 1);
// //       });

// //       it('adds the trade to the portfolio', () => {
// //         expect(postTradeCount).to.eq(preTradeCount + 1);
// //         // expect(savedPortfolio.stockTrades.find((id) => id === anotherTrade._id)).not.to.be.undefined;
// //       });

// //       it('does not create new Holding', () => {
// //         expect(postHoldingsCount).to.eq(preHoldingsCount);
// //         expect(savedPortfolio.holdings.find((h) => h.symbol === newTrade.symbol)).not.to.be.undefined;
// //       });

// //       describe('updates the holding', () => {
// //         it('updates the quantity', () => {
// //           expect(updatedHolding.quantity).not.to.eq(existingHolding.quantity);
// //         });
// //         it('updates the average cost', () => {
// //           expect(updatedHolding.avgCost).not.to.eq(existingHolding.avgCost);
// //         });
// //       });
// //     });
// //   });

// //   describe('remove stock trade from portfolio', () => {

// //     beforeEach(async () => {

// //     });

// //     xit('removes the id from the portfolio', () => {});
// //     xit('deletes the StockTrade');
// //     xdescribe('updates the holding', () => {
// //       xit('updates the quantity');
// //       xit('average cost stays the same');
// //     });
// //   });

// }));
