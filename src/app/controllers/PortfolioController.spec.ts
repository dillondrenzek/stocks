import { expect } from 'chai';
import * as DB from '../../db';
import { withDb } from '../../spec/helpers/db-connect';
import { PortfolioController } from './PortfolioController';
import { Portfolio, Trade, StockTrade } from '../../types';
// import {} from '../../spec/helpers/db-generators';
import {defaultStockTrade} from '../../spec/helpers/type-defaults';

describe('PortfolioController', withDb(() => {
  let controller: PortfolioController;

  beforeEach(function () {
    controller = new PortfolioController();
  });

  describe('creates a portfolio using a name', () => {
    const newPortfolioName = 'New Portfolio';
    let beforeCount: number, afterCount: number;
    let returned: any;

    beforeEach(async () => {
      // count before
      beforeCount = await DB.Portfolio.countDocuments();
      // create portfolio
      returned = await controller.createPortfolioWithName(newPortfolioName);
      // count after
      afterCount = await DB.Portfolio.countDocuments();
    });

    it('returns the created portfolio', () => {
      expect(returned).not.to.be.undefined;
      expect(afterCount).to.eq(beforeCount + 1);
    });
  });

  describe('get portfolios', () => {
    it('gets all portfolios', async () => {
      // create portfolios
      await DB.Portfolio.createByName('New Portfolio 1');
      await DB.Portfolio.createByName('New Portfolio 2');
      // get existing
      const portfolios = await controller.getPortfolios();
      // expect two portfolios returned
      expect(portfolios.length).to.eq(2);
    });

    it('gets portfolio by id', async () => {
      // create portfolio
      const created = await DB.Portfolio.createByName('New Portfolio 1'); 
      // get portfolio
      const portfolio = await controller.getPortfolioById(created.id);
      // expect portfolio to be defined
      expect(portfolio.id).to.eq(created.id);
    });
  });

  describe('delete portfolios', () => {
    describe('that exist', () => {
      let existing: DB.IPortfolioDocument;
      beforeEach(async () => {
        existing = await DB.Portfolio.createByName('Test Portfolio');
      });
      it('should return the deleted portfolio', async () => {
        // delete portfolio
        const removed = await controller.deletePortfolioById(existing.id);
        // expect
        expect(removed).not.to.be.undefined;
        expect(removed.id).to.eq(existing.id);
      });
    });

    describe('that do not exist', () => {
      it('should return null', async () => {
        // delete non-existent portfolio
        const removed = await controller.deletePortfolioById('does not exist');
        // expect
        expect(removed).to.be.null;
      });
    });
  });

  describe('add stock trade to portfolio', () => {
    const newTrade: StockTrade = defaultStockTrade();
    let savedPortfolio: DB.IPortfolioDocument;

    beforeEach(async () => {
      savedPortfolio = await DB.Portfolio.createByName('Test');
    });

    describe('with a symbol that does not have a holding', () => {

      it('creates the trade', async () => {
        let preTradeCount: number, postTradeCount: number;
        // count before
        preTradeCount = await DB.StockTrade.countDocuments();
        // perform test
        await controller.addTradeToPortfolio(newTrade, savedPortfolio.id);
        // count after
        postTradeCount = await DB.StockTrade.countDocuments();
        // test
        expect(postTradeCount).to.eq(preTradeCount + 1);
      });

      it('adds the trade to the portfolio', async () => {
        let preCount: number, postCount: number;
        // count before
        preCount = savedPortfolio.stockTrades.length;
        // perform test
        await controller.addTradeToPortfolio(newTrade, savedPortfolio.id);
        savedPortfolio = await DB.Portfolio.findById(savedPortfolio.id);
        // count after
        postCount = savedPortfolio.stockTrades.length;
        // test
        expect(postCount).to.eq(preCount + 1);
      });

    });

  });

}));
