import { expect } from 'chai';
import * as DB from '../../../db';
import * as Types from '../../lib/types';
import { generateOptionTransaction, generateStockTransaction } from '../../spec/helpers/db-generators';
import { withDb } from '../../spec/helpers/db-connect';
import { OptionTransactionController } from './OptionTransactionController';



describe('OptionTransactionController', withDb(() => {

  describe('saves a Transaction', () => {
    let transaction: Types.Transaction,
      savedTransaction: Types.Transaction;
  
    describe('as an OptionTransaction', () => {
      beforeEach(async () => {
        transaction = generateOptionTransaction();
        savedTransaction = await OptionTransactionController.saveTransaction(transaction);
      });

      it('returns a transaction', () => {
        expect(savedTransaction._id).to.exist;
      });

      it('returns a transaction with an id', () => {
        expect(typeof savedTransaction._id).to.eq('string');
      });

      it('returns a transaction with the correct type', () => {
        expect(savedTransaction.type).to.eq('option');
      });
    });
  });

  describe('deletes a OptionTransaction', () => {
    let transaction: Types.OptionTransaction,
      savedTransaction: Types.Transaction,
      fetchedTransaction: DB.IOptionTransactionDocument;

    beforeEach(async () => {
      // get a stock tx
      transaction = generateOptionTransaction();
      // save it
      savedTransaction = await OptionTransactionController.saveTransaction(transaction);
      // remove it
      await OptionTransactionController.deleteTransaction(savedTransaction);
    });

    it('should not return a transaction', async () => {
      // fetch tx
      fetchedTransaction = await DB.OptionTransaction.findById(savedTransaction._id);
      
      expect(fetchedTransaction).not.to.exist;
    });

  });

  describe('gets a Transaction by id', () => {
    describe('if called with an id that doesn\'t exist', () => {
      it('throws an error', () => {
        expect(() => OptionTransactionController.getTransactionById('abc')).to.throw;
      });
    });
    describe('for a saved Option Transaction', () => {
      let tx: Types.OptionTransaction,
        savedTx: Types.Transaction,
        fetchedTx: Types.Transaction;

      beforeEach(async () => {
        tx = generateOptionTransaction();
        savedTx = await OptionTransactionController.saveTransaction(tx);
        fetchedTx = await OptionTransactionController.getTransactionById(savedTx._id);
      });

      it('fetches the transaction', () => {
        expect(fetchedTx).to.exist;
        expect(fetchedTx._id).to.eq(savedTx._id);
        expect(fetchedTx.type).to.eq('option');
      });
    });
  });

  describe('gets Option Transactions for a list of ids', () => {
    let transaction: Types.OptionTransaction,
      savedTransactions: Types.Transaction[] = [],
      savedTransactionIds: string[] = [],
      fetchedTransactions: Types.Transaction[] = [];


    describe('with an empty list', () => {
      beforeEach(async () => {
        // fetch an empty array
        fetchedTransactions = await OptionTransactionController.getTransactionsByIds([]);
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
          fetchedTransactions = await OptionTransactionController.getTransactionsByIds([null]);
        }
        await expect(fn).to.throw;
      });
    });

    beforeEach(async () => {
      transaction = generateOptionTransaction();

      savedTransactions = await Promise.all([
        OptionTransactionController.saveTransaction(transaction), 
        OptionTransactionController.saveTransaction(transaction)
      ]);

      savedTransactionIds = savedTransactions.map(t => t._id);
      
      fetchedTransactions = await OptionTransactionController.getTransactionsByIds(savedTransactionIds);
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
  
  describe('gets Options Transactions for a list of ids', () => {
    let transaction: Types.OptionTransaction,
      savedTransactions: Types.Transaction[] = [],
      savedTransactionIds: string[] = [],
      fetchedTransactions: Types.Transaction[] = [];
    beforeEach(async () => {
      transaction = generateOptionTransaction();

      savedTransactions = await Promise.all([
        OptionTransactionController.saveTransaction(transaction), 
        OptionTransactionController.saveTransaction(transaction)
      ]);

      savedTransactionIds = savedTransactions.map(t => t._id);
      
      fetchedTransactions = await OptionTransactionController.getTransactionsByIds(savedTransactionIds);
    });

    it('fetches full objects', () => {
      expect(fetchedTransactions.length).to.eq(2);
      expect(typeof fetchedTransactions[0]).to.eq('object');
      expect(typeof fetchedTransactions[1]).to.eq('object');
    });

    it('has the correct id', () => {
      const tx = fetchedTransactions[0];
      expect(tx._id).to.eq(savedTransactionIds[0]);
    });
  });

}));