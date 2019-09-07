import { expect } from 'chai';
import * as DB from '../../db';
import * as Types from '../../lib/types';
import { generateOptionTransaction, generateStockTransaction } from '../../spec/helpers/db-generators';
import { withDb } from '../../spec/helpers/db-connect';
import { TradeController } from './TradeController';



describe('TradeController', withDb(() => {

  describe('saves a Transaction', () => {
    let transaction: Types.Transaction,
      savedTransaction: Types.Transaction;

    describe('as a StockTransaction', () => {
      beforeEach(async () => {
        // get a stock tx
        transaction = generateStockTransaction();
        // save it
        savedTransaction = await TradeController.saveTransaction(transaction);
      });

      it('returns a transaction', () => {
        expect(savedTransaction).to.exist;
        expect(typeof savedTransaction._id).to.eq('string');
      });
    });
  
    describe('as an OptionTransaction', () => {
      beforeEach(async () => {
        transaction = generateOptionTransaction();

        savedTransaction = await TradeController.saveTransaction(transaction);
      });

      it('returns a transaction', () => {
        expect(savedTransaction._id).to.exist;
        expect(typeof savedTransaction._id).to.eq('string');
      });
    });
  });

  describe('gets a Transaction by id', () => {
    describe('if called with an id that doesn\'t exist', () => {
      it('throws an error', () => {
        expect(() => TradeController.getTransactionById('abc')).to.throw;
      });
    });
    describe('for a saved Stock Transaction', () => {
      let tx: Types.StockTransaction,
        savedTx: Types.Transaction,
        fetchedTx: Types.Transaction;

        beforeEach(async () => {
          tx = generateStockTransaction();
          savedTx = await TradeController.saveTransaction(tx);
          fetchedTx = await TradeController.getTransactionById(savedTx._id);
        });

        it('fetches the transaction', () => {
          expect(fetchedTx).to.exist;
          expect(fetchedTx._id).to.eq(savedTx._id);
          expect(fetchedTx.type).to.eq('stock');
        });
    });
    describe('for a saved Option Transaction', () => {
      let tx: Types.OptionTransaction,
        savedTx: Types.Transaction,
        fetchedTx: Types.Transaction;

      beforeEach(async () => {
        tx = generateOptionTransaction();
        savedTx = await TradeController.saveTransaction(tx);
        fetchedTx = await TradeController.getTransactionById(savedTx._id);
      });

      it('fetches the transaction', () => {
        expect(fetchedTx).to.exist;
        expect(fetchedTx._id).to.eq(savedTx._id);
        expect(fetchedTx.type).to.eq('option');
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
        fetchedTransactions = await TradeController.getTransactionsByIds([]);
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
          fetchedTransactions = await TradeController.getTransactionsByIds([null]);
        }
        await expect(fn).to.throw;
      });
    });

    beforeEach(async () => {
      transaction = generateStockTransaction();

      savedTransactions = await Promise.all([
        TradeController.saveTransaction(transaction), 
        TradeController.saveTransaction(transaction)
      ]);

      savedTransactionIds = savedTransactions.map(t => t._id);
      
      fetchedTransactions = await TradeController.getTransactionsByIds(savedTransactionIds);
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
        TradeController.saveTransaction(transaction), 
        TradeController.saveTransaction(transaction)
      ]);

      savedTransactionIds = savedTransactions.map(t => t._id);
      
      fetchedTransactions = await TradeController.getTransactionsByIds(savedTransactionIds);
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