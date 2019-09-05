import { expect } from 'chai';
import * as DB from '../../db';
import * as Types from '../../lib/types';
import { withDb } from '../../spec/helpers/db-connect';
import { TradeController } from './TradeController';

describe('TradeController', withDb(() => {

  describe('adds a Transaction', () => {

    describe('as a StockTransaction', () => {
      let transaction: Types.StockTransaction,
        savedTransaction: Types.Transaction;
      beforeEach(async () => {
        transaction = {
          type: 'stock',
          symbol: 'TEST',
          price: 3.33,
          quantity: 2,
          side: 'buy'
        };

        savedTransaction = await TradeController.addTransaction(transaction);
      });

      it('creates a transaction with an id', () => {
        expect(savedTransaction._id).to.exist;
      });
    });
  
    describe('as an OptionTransaction', () => {
      let transaction: Types.OptionTransaction,
        savedTransaction: Types.Transaction;
      beforeEach(async () => {
        transaction = {
          type: 'option',
          symbol: 'TEST',
          price: 3.33,
          quantity: 2,
          side: 'buy',
          callPut: 'call',
          expirationDate: new Date(),
          strikePrice: 185.50
        };

        savedTransaction = await TradeController.addTransaction(transaction);
      });

      it('creates a transaction with an id', () => {
        expect(savedTransaction._id).to.exist;
      });
    });
  });

}));