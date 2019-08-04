import chai, {expect} from 'chai';
import mongoose from 'mongoose';
import { withDb } from '../../spec/helpers/db-connect';
import { Holding, IHoldingDocument } from '../holding/Holding';
import {
  defaultOptionTrade,
  defaultStockTrade,
  IOptionTradeDocument,
  IStockTradeDocument,
  OptionTrade,
  StockTrade,
} from '../trade';
import {
  defaultPortfolio,
  IPortfolioDocument,
  Portfolio,
} from './Portfolio';

describe('Portfolio', withDb(() => {
  let portfolio: IPortfolioDocument;

  describe('adds a Holding', () => {
    let precount: number;
    let postcount: number;
    let holding: IHoldingDocument;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create({
        holdingIds: [],
        name: 'Test Portfolio',
        tradeIds: []
      });
      // create test holding
      holding = await Holding.create({
        cost: 0.00,
        portfolioId: null,
        quantity: 0.00,
        symbol: 'TEST',
        tradeIds: [],
      });
      //
      precount = portfolio.holdingIds.length;
      // perform test
      await portfolio.addHolding(holding);
      //
      postcount = portfolio.holdingIds.length;
    });

    it('increases the length of the holdings array', () => {
      expect(postcount).to.eq(precount + 1);
    });
  });

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

  describe('adds a OptionTrade', () => {
    let precount: number,
      postcount: number,
      trade: IOptionTradeDocument;

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.create(defaultPortfolio());
      // create test holding
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

}));
