import chai, {expect} from 'chai';
import mongoose from 'mongoose';
import { withDb } from '../../spec/helpers/db-connect';
import {
  defaultOptionTrade,
  defaultStockTrade,
  IOptionTradeDocument,
  IStockTradeDocument,
  OptionTrade,
  StockTrade,
  IStockTrade,
} from '../trade';
import {
  defaultPortfolio,
  IPortfolioDocument,
  Portfolio,
} from './Portfolio';
import { Holding } from '../../types';

describe('Portfolio', withDb(() => {
  let portfolio: IPortfolioDocument;

  // xdescribe('adds a Holding', () => {
  //   let precount: number;
  //   let postcount: number;
  //   let holding: IHoldingDocument;

  //   beforeEach(async () => {
  //     // create test portfolio
  //     portfolio = await Portfolio.create({
  //       holdingIds: [],
  //       name: 'Test Portfolio',
  //       tradeIds: []
  //     });
  //     // create test holding
  //     holding = await Holding.create({
  //       cost: 0.00,
  //       portfolioId: null,
  //       quantity: 0.00,
  //       symbol: 'TEST',
  //       tradeIds: [],
  //     });
  //     //
  //     precount = portfolio.holdingIds.length;
  //     // perform test
  //     await portfolio.addHolding(holding);
  //     //
  //     postcount = portfolio.holdingIds.length;
  //   });

  //   it('increases the length of the holdings array', () => {
  //     expect(postcount).to.eq(precount + 1);
  //   });
  // });

  describe('adds a StockTrade', () => {
    let precount: number;
    let postcount: number;
    let trade: IStockTradeDocument;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create(defaultPortfolio());
      // create test trade
      trade = await StockTrade.create(defaultStockTrade());

      precount = portfolio.stockTrades.length;
      // perform test
      await portfolio.addTrade(trade);
      //
      postcount = portfolio.stockTrades.length;
    });

    it('increases the length of the trades array', () => {
      expect(postcount).to.eq(precount + 1);
    });
  });

  describe('gets all StockTrades', () => {

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create(defaultPortfolio());
      // create test trades
      await portfolio.addTrade(await StockTrade.create(defaultStockTrade()));
      await portfolio.addTrade(await StockTrade.create(defaultStockTrade()));
      await portfolio.addTrade(await StockTrade.create(defaultStockTrade()));
    });

    it('returns the appropriate number of StockTrades', async () => {
      const result = await portfolio.getAllStockTrades();
      expect(result.length).to.eq(3);
    });
  });

  describe('adds a OptionTrade', () => {
    let precount: number,
      postcount: number,
      trade: IOptionTradeDocument;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create(defaultPortfolio());
      // create test trades
      trade = await OptionTrade.create(defaultOptionTrade());
      
      precount = portfolio.optionTrades.length;
      // perform test
      await portfolio.addTrade(trade);
      //
      postcount = portfolio.optionTrades.length;
    });

    it('increases the length of the trades array', () => {
      expect(postcount).to.eq(precount + 1);
    });
  });

  describe('gets all OptionTrades', () => {

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create(defaultPortfolio());
      // create test trades
      await portfolio.addTrade(await OptionTrade.create(defaultOptionTrade()));
      await portfolio.addTrade(await OptionTrade.create(defaultOptionTrade()));
      await portfolio.addTrade(await OptionTrade.create(defaultOptionTrade()));
    });

    it('returns the appropriate number of OptionTrades', async () => {
      const result = await portfolio.getAllOptionTrades();
      expect(result.length).to.eq(3);
    });
  });

  describe('deletes a StockTrade', () => {
    let trade: IStockTradeDocument;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create(defaultPortfolio());
      // create test trade
      trade = await StockTrade.create(defaultStockTrade());
      // add test trade to portfolio
      portfolio = await portfolio.addTrade(trade);
    });

    it('removes the trade from the trades array', async () => {
      // delete stock trade
      portfolio = await portfolio.removeTradeById(trade.type, trade.id);
      // await Portfolio.findById(portfolio.id);
      expect(portfolio.stockTrades).not.to.contain(trade.id);
    });
  });

  describe('deletes a OptionTrade', () => {
    let trade: IOptionTradeDocument;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create(defaultPortfolio());
      // create test trade
      trade = await OptionTrade.create(defaultOptionTrade());
    });

    it('removes the trade from the trades array', async () => {
      // add test trade to portfolio
      await portfolio.addTrade(trade);
      expect(portfolio.optionTrades).to.contain(trade.id);
      // delete option trade
      await portfolio.removeTradeById(trade.type, trade.id);
      portfolio = await Portfolio.findById(portfolio.id);
      expect(portfolio.optionTrades).not.to.contain(trade.id);
    });
  });

  describe('add or update Holding', () => {
    let holding: Holding;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.createByName('Test Portfolio');
    });

    describe('holding doesn\'t already exist', () => {
      let holdingsPreCount: number, holdingsPostCount: number;
      beforeEach(async () => {
        holding = { quantity: 23, avgCost: 152.14, symbol: 'TEST' };

        holdingsPreCount = portfolio.holdings.length;

        portfolio = await portfolio.addOrUpdateHolding(holding);

        holdingsPostCount = portfolio.holdings.length;
      });
      it('increases the length of the holdings array', () => {
        expect(holdingsPostCount).to.eq(holdingsPreCount + 1);
      });
      it('sets the quantity', () => {
        const updatedHolding = portfolio.getHoldingBySymbol(holding.symbol);
        expect(updatedHolding.quantity).to.eq(23);
      });
      it('sets the average cost', () => {
        const updatedHolding = portfolio.getHoldingBySymbol(holding.symbol);
        expect(updatedHolding.avgCost).to.eq(152.14);
      });
    });

    describe('holding already exists', () => {
      let holdingsPreCount: number, holdingsPostCount: number;
      let anotherHolding: Holding;
      beforeEach(async () => {
        holding = { quantity: 23, avgCost: 152.14, symbol: 'TEST' };
        anotherHolding = { quantity: 11, avgCost: 13.88, symbol: 'TEST' };
        portfolio = await portfolio.addOrUpdateHolding(holding);

        holdingsPreCount = portfolio.holdings.length;

        portfolio = await portfolio.addOrUpdateHolding(anotherHolding);

        holdingsPostCount = portfolio.holdings.length;
      });
      it('does not increase the length of the holdings array', () => {
        expect(holdingsPostCount).to.eq(holdingsPreCount);
      });
      it('sets the quantity', () => {
        const updatedHolding = portfolio.getHoldingBySymbol(holding.symbol);
        expect(updatedHolding.quantity).not.to.eq(23);
        expect(updatedHolding.quantity).to.eq(11);
      });
      it('sets the average cost', () => {
        const updatedHolding = portfolio.getHoldingBySymbol(holding.symbol);
        expect(updatedHolding.avgCost).not.to.eq(152.14);
        expect(updatedHolding.avgCost).to.eq(13.88);
      });
    });
  });
}));
