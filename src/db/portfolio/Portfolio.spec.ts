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
    let foundPortfolios: IPortfolioDocument[];

    beforeEach(async () => {
      name = 'Test Portfolio';
      await Portfolio.createByName(name);
      foundPortfolios = await Portfolio.find({ name: { $eq: name } });
    });

    it('creates one Portfolio', () => {
      expect(foundPortfolios.length).to.eq(1);
    });

    it('creates a new Portfolio with the correct name', async () => {
      const createdPortfolio = foundPortfolios[0];
      expect(createdPortfolio.name).to.eq(name);
    });

    it('creates a portfolio with a holdings object', async () => {
      const createdPortfolio = foundPortfolios[0];
      console.log(createdPortfolio);
      expect(createdPortfolio.holdings).to.exist;
    })
  });

}));
