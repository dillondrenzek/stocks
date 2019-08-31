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

  describe('create by name', () => {
    let name: string;

    beforeEach(async () => {
      name = 'Test Portfolio';
      await Portfolio.createByName(name);
    });

    it('creates a new Portfolio with the correct name', async () => {
      const foundPortfolios = await Portfolio.find({ name });
      expect(foundPortfolios.length).to.eq(1);
    });
  });


}));
