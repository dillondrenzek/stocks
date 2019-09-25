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
import * as Types from '../../lib/types';
import { create } from 'domain';
import { generateStockTransaction } from '../../spec/helpers/db-generators';

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
          // fetch portfolio
          portfolio = await Portfolio.findById(portfolio.id);
          // assume created holding
          createdHolding = portfolio.holdings[transactionSymbol];
        });

        it('should create a new holding', () => {
          expect(createdHolding).to.exist;
        });

        it('should add the transaction id to the holdings transactions', () => {
          expect(createdHolding.transactions).to.contain(savedTransaction.id);
        });

      });

    });

    describe('to a portfolio with a holding for transaction symbol', () => {
      let transactionSymbol = 'TEST',
        existingHolding: Types.Holding;

      describe('by passing an id of a saved transaction', () => {
        let firstTransaction: IStockTransactionDocument,
          secondTransaction: IStockTransactionDocument,
          precount: number,
          postcount: number;

        beforeEach(async () => {
          // save transaction first
          firstTransaction = await StockTransaction.create({ symbol: transactionSymbol });
          secondTransaction = await StockTransaction.create({ symbol: transactionSymbol });
          // add first transaction to portfolio
          await portfolio.addTransaction(firstTransaction);
          await portfolio.save();
          // add another transaction
          await portfolio.addTransaction(secondTransaction);
          await portfolio.save();
          portfolio = await Portfolio.findById(portfolio.id);
          // assume created holding
          existingHolding = portfolio.holdings[transactionSymbol];
        });

        it('should have added one transaction id', () => {
          expect(existingHolding).to.exist;
        });

        it('should still have the first transaction id', () => {
          expect(existingHolding.transactions).to.contain(firstTransaction.id);
        });

        it('should add the transaction id to the holdings transactions', () => {
          expect(existingHolding.transactions).to.contain(secondTransaction.id);
          // there should now be two transactions
          expect(existingHolding.transactions.length).to.eq(2);
        });

      });

    });

  });

  describe('removes a stock transaction by id', () => {
    let tx: Types.StockTransaction;
    let removeId = 'testiddoesntmatter';

    beforeEach(async () => {
      tx = generateStockTransaction();
      tx._id = removeId;
      // create test portfolio
      portfolio = await Portfolio.createByName('Test');
      // add a tx id
      portfolio.addTransaction(tx);
      // save portfolio
      await portfolio.save();
      // fetch portfolio
      portfolio = await Portfolio.findById(portfolio.id);
      // remove a tx id
      portfolio.removeTransaction(tx);
      // save portfolio
      await portfolio.save();
      // fetch portfolio
      portfolio = await Portfolio.findById(portfolio.id);
    });

    it('has a holding for that symbol', () => {
      expect(portfolio.holdings[tx.symbol]).to.exist;
    });

    it('does not contain a transaction with that id', () => {
      expect(portfolio.holdings[tx.symbol].transactions).not.to.contain(tx._id);
    });
  });

}));
