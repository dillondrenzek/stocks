import { expect } from 'chai';
import * as DB from '../../db';
import * as Types from '../../lib/types';
import { generateStockTransaction } from '../../spec/helpers/db-generators';
import { withDb } from '../../spec/helpers/db-connect';
import { StockTransactionController } from './StockTransactionController';



describe('StockTransactionController', withDb(() => {

  describe('saves a Transaction', () => {
    let transaction: Types.Transaction,
      savedTransaction: Types.Transaction;

    describe('as a StockTransaction', () => {
      beforeEach(async () => {
        // get a stock tx
        transaction = generateStockTransaction();
        // save it
        savedTransaction = await StockTransactionController.saveTransaction(transaction);
      });

      it('returns a transaction', () => {
        expect(savedTransaction).to.exist;
        expect(typeof savedTransaction._id).to.eq('string');
      });
    });
  });

  describe('deletes a StockTransaction', () => {
    let transaction: Types.StockTransaction,
      savedTransaction: Types.Transaction,
      fetchedTransaction: DB.IStockTransactionDocument;

    beforeEach(async () => {
      // get a stock tx
      transaction = generateStockTransaction();
      // save it
      savedTransaction = await StockTransactionController.saveTransaction(transaction);
      // remove it
      await StockTransactionController.deleteTransaction(savedTransaction);
    });

    it('should not return a transaction', async () => {
      // fetch tx
      fetchedTransaction = await DB.StockTransaction.findById(savedTransaction._id);
      
      expect(fetchedTransaction).not.to.exist;
    });

  });

  describe('gets a Transaction by id', () => {
    describe('if called with an id that doesn\'t exist', () => {
      it('throws an error', () => {
        expect(() => StockTransactionController.getTransactionById('abc')).to.throw;
      });
    });
    describe('for a saved Stock Transaction', () => {
      let tx: Types.StockTransaction,
        savedTx: Types.Transaction,
        fetchedTx: Types.Transaction;

        beforeEach(async () => {
          tx = generateStockTransaction();
          savedTx = await StockTransactionController.saveTransaction(tx);
          fetchedTx = await StockTransactionController.getTransactionById(savedTx._id);
        });

        it('fetches the transaction', () => {
          expect(fetchedTx).to.exist;
          expect(fetchedTx._id).to.eq(savedTx._id);
          expect(fetchedTx.type).to.eq('stock');
        });
    });
  });

  describe('gets Stock Transactions for a list of ids', () => {
    let transaction: Types.StockTransaction,
      savedTransactions: Types.Transaction[] = [],
      savedTransactionIds: string[] = [],
      fetchedTransactions: Types.Transaction[] = [];


    describe('with an empty list', () => {
      beforeEach(async () => {
        // fetch an empty array
        fetchedTransactions = await StockTransactionController.getTransactionsByIds([]);
      });

      it('returns an empty array', () => {
        expect(fetchedTransactions).to.exist;
        expect(fetchedTransactions.length).to.eq(0);
      });
    });

    describe('with a list containing invalid ids', () => {
      it('should throw', async () => {
        const fn = async () => {
          // fetch an empty array
          fetchedTransactions = await StockTransactionController.getTransactionsByIds([null]);
        }
        await expect(fn).to.throw;
      });
    });

    beforeEach(async () => {
      transaction = generateStockTransaction();

      savedTransactions = await Promise.all([
        StockTransactionController.saveTransaction(transaction), 
        StockTransactionController.saveTransaction(transaction)
      ]);

      savedTransactionIds = savedTransactions.map(t => t._id);
      
      fetchedTransactions = await StockTransactionController.getTransactionsByIds(savedTransactionIds);
    });

    it('fetches full objects', () => {
      expect(fetchedTransactions.length).to.eq(2);
      expect(typeof fetchedTransactions[0]).to.eq('object');
      expect(typeof fetchedTransactions[1]).to.eq('object');
    });

    it('has the correct ids', () => {
      expect(fetchedTransactions[0]._id).to.eq(savedTransactionIds[0]);
      expect(fetchedTransactions[1]._id).to.eq(savedTransactionIds[1]);
    });
  });

}));