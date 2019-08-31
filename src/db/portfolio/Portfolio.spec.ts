import { expect } from 'chai';
import { withDb } from '../../spec/helpers/db-connect';
import { 
  ITransactionDocument,
  IStockTransactionDocument,
  StockTransaction
} from '../transaction';
import {
  IPortfolioDocument,
  Portfolio,
} from './Portfolio';
import * as Types from '../../types';
import { create } from 'domain';

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

    it('creates a new Portfolio with the correct name', () => {
      const createdPortfolio = foundPortfolios[0];
      expect(createdPortfolio.name).to.eq(name);
    });

    it('creates a portfolio with a holdings object', () => {
      const createdPortfolio = foundPortfolios[0];
      expect(createdPortfolio.holdings).to.exist;
    })
  });

  describe('adds a stock transaction', () => {

    beforeEach(async () => {
      // create test portfolio
      portfolio = await Portfolio.createByName('Test');


    });

    describe('to a portfolio without a holding for transaction symbol', () => {
      let transactionSymbol = 'TEST',
        createdHolding: Types.Holding;

      describe('by passing an id of a saved transaction', () => {
        let savedTransaction: IStockTransactionDocument;

        beforeEach(async () => {
          // save transaction first
          savedTransaction = await StockTransaction.create({ symbol: transactionSymbol });
          // add saved transaction to portfolio
          await portfolio.addTransaction(savedTransaction);
          // save portfolio
          await portfolio.save();
          // assume created holding
          console.log(portfolio);
          createdHolding = portfolio.holdings[transactionSymbol];
        });

        it('should create a new holding', () => {
          expect(createdHolding).to.exist;
        });

        it('should add the transaction id to the holdings transactions', () => {
          expect(createdHolding.transactions).to.contain(savedTransaction.id);
        })

      });

    });



  });

}));
