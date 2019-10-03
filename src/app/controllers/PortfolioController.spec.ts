import { expect } from 'chai';
import * as DB from '../../db';
import * as Types from '../../lib/types';
import { withDb } from '../../spec/helpers/db-connect';
import { generateHolding, generateOptionTransaction, generateStockTransaction } from '../../spec/helpers/db-generators';
import { PortfolioController } from './PortfolioController';

describe('PortfolioController', withDb(() => {

  describe('StockTransaction', () => {

    describe('adds a StockTransaction to a Portfolio', () => {
      let transaction: Types.StockTransaction = generateStockTransaction(),
        portfolio: DB.IPortfolioDocument,
        savedPortfolio: Types.Portfolio;

      beforeEach(async () => {
        // create test portfolio
        portfolio = await DB.Portfolio.createByName('Test');
        // 
        savedPortfolio = await PortfolioController.addTransactionToPortfolio(transaction, portfolio.id);
      });

      it('returns the saved portfolio', () => {
        expect(savedPortfolio).to.exist;
        expect(savedPortfolio._id).to.eq(portfolio.id);
      })
      
      it('has a Holding that contains a transaction id', () => {
        const holding = savedPortfolio.holdings[transaction.symbol];
        expect(holding).to.exist;
        expect(holding.stockTransactions.length).to.eq(1);
        expect(typeof holding.stockTransactions[0]).to.eq('string');
      });

    });

    describe('removes a StockTransaction from a Portfolio', () => {
      let transaction: Types.Transaction = generateStockTransaction(),
        savedTransaction: DB.IStockTransactionDocument,
        portfolioWithTx: Types.Portfolio,
        portfolio: DB.IPortfolioDocument,
        savedPortfolio: Types.Portfolio,
        removeTransactionId: string;

      beforeEach(async () => {
        // create test portfolio
        portfolio = await DB.Portfolio.createByName('Test');
        // add the transaction
        portfolioWithTx = await PortfolioController.addTransactionToPortfolio(transaction, portfolio.id);
        removeTransactionId = portfolioWithTx.holdings[transaction.symbol].stockTransactions[0];
        // remove the portfolio
        savedPortfolio = await PortfolioController.removeTransactionFromPortfolio(removeTransactionId, portfolio.id);
      });

      it('has a Holding that does not contain the transaction id', () => {
        const holding = savedPortfolio.holdings[transaction.symbol];
        expect(holding).to.exist;
        expect(holding.stockTransactions).not.to.contain(removeTransactionId);
        expect(holding.stockTransactions.length).to.eq(0);
      });

    });

    describe('fetches StockTransactions for a Holding', () => {
      let holding: Types.Holding,
        tx1: Types.StockTransaction,
        savedTx1: DB.IStockTransactionDocument,
        fetchedHolding: Types.Holding;

      beforeEach(async () => {
        holding = generateHolding();
        tx1 = generateStockTransaction();
        // save transaction
        savedTx1 = await DB.StockTransaction.create(tx1);
        holding.stockTransactions = [savedTx1.id];
        //
        fetchedHolding = await PortfolioController.fetchTransactionsForHolding(holding);
      });

      it('returns the fetched Holding', () => {
        expect(fetchedHolding).to.exist;
      });

      it('returns with each transaction object', () => {
        expect(fetchedHolding.stockTransactions.length).to.eq(1);
        expect(typeof fetchedHolding.stockTransactions[0]).to.eq('object');
        expect((fetchedHolding.stockTransactions[0] as any)._id).to.eq(savedTx1.id);
      });
    });
  });

  describe('OptionTransaction', () => {

    describe('adds a OptionTransaction to a Portfolio', () => {
      let transaction: Types.OptionTransaction = generateOptionTransaction(),
        portfolio: DB.IPortfolioDocument,
        savedPortfolio: Types.Portfolio;

      beforeEach(async () => {
        // create test portfolio
        portfolio = await DB.Portfolio.createByName('Test');
        // 
        savedPortfolio = await PortfolioController.addTransactionToPortfolio(transaction, portfolio.id);
      });

      it('returns the saved portfolio', () => {
        expect(savedPortfolio).to.exist;
        expect(savedPortfolio._id).to.eq(portfolio.id);
      })

      it('has a Holding that contains a transaction id', () => {
        const holding = savedPortfolio.holdings[transaction.symbol];
        expect(holding).to.exist;
        expect(holding.optionTransactions.length).to.eq(1);
        expect(typeof holding.optionTransactions[0]).to.eq('string');
      });

    });

    describe('removes a OptionTransaction from a Portfolio', () => {
      let transaction: Types.Transaction = generateOptionTransaction(),
        savedTransaction: DB.IOptionTransactionDocument,
        portfolioWithTx: Types.Portfolio,
        portfolio: DB.IPortfolioDocument,
        savedPortfolio: Types.Portfolio,
        removeTransactionId: string;

      beforeEach(async () => {
        // create test portfolio
        portfolio = await DB.Portfolio.createByName('Test');
        // add the transaction
        portfolioWithTx = await PortfolioController.addTransactionToPortfolio(transaction, portfolio.id);
        removeTransactionId = portfolioWithTx.holdings[transaction.symbol].optionTransactions[0];
        // remove the portfolio
        savedPortfolio = await PortfolioController.removeTransactionFromPortfolio(removeTransactionId, portfolio.id);
      });

      it('has a Holding that does not contain the transaction id', () => {
        const holding = savedPortfolio.holdings[transaction.symbol];
        expect(holding).to.exist;
        expect(holding.optionTransactions).not.to.contain(removeTransactionId);
        expect(holding.optionTransactions.length).to.eq(0);
      });

    });

    describe('fetches OptionTransactions for a Holding', () => {
      let holding: Types.Holding,
        tx1: Types.OptionTransaction,
        savedTx1: DB.IOptionTransactionDocument,
        fetchedHolding: Types.Holding;

      beforeEach(async () => {
        holding = generateHolding();
        tx1 = generateOptionTransaction();
        // save transaction
        savedTx1 = await DB.OptionTransaction.create(tx1);
        holding.optionTransactions = [savedTx1.id];
        //
        fetchedHolding = await PortfolioController.fetchTransactionsForHolding(holding);
      });

      it('returns the fetched Holding', () => {
        expect(fetchedHolding).to.exist;
      });

      it('returns with each transaction object', () => {
        expect(fetchedHolding.optionTransactions.length).to.eq(1);
        expect(typeof fetchedHolding.optionTransactions[0]).to.eq('object');
        expect((fetchedHolding.optionTransactions[0] as any)._id).to.eq(savedTx1.id);
      });
    });

  });

}));
