import { StockTransaction } from './transaction';

describe('StockTransaction', () => {

  describe('- cost', () => {
    describe('for a buy', () => {
      it('equals quantity times price', () => {
        const tx = new StockTransaction({ side: 'buy', price: 5, quantity: 2 });
        expect(tx.cost).toEqual(10);
      });
    });
    describe('for a sell', () => {
      it('equals 0', () => {
        const tx = new StockTransaction({ side: 'sell', price: 5, quantity: 2 });
        expect(tx.cost).toEqual(10);
      });
    });
  });

  describe('- total quantity', () => {
    describe('for multiple buys', () => {
      it('is correct', () => {
        const txs = [
          new StockTransaction({ side: 'buy', price: 10.35, quantity: 2 }),
          new StockTransaction({ side: 'buy', price: 14.39, quantity: 1 }),
          new StockTransaction({ side: 'buy', price: 9.34, quantity: 8 }),
        ];
        expect(StockTransaction.totalQuantity(txs)).toEqual(11);
      });
    });
  });

  describe('- total cost', () => {
    describe('for multiple buys', () => {
      it('is correct', () => {
        const txs = [
          new StockTransaction({ side: 'buy', price: 10.35, quantity: 2 }),
          new StockTransaction({ side: 'buy', price: 14.39, quantity: 1 }),
          new StockTransaction({ side: 'buy', price: 9.34, quantity: 8 }),
        ];
        expect(StockTransaction.totalCost(txs)).toEqual(109.81);
      });
    });
  });

  describe('- average cost', () => {
    describe('for multiple buys', () => {
      it('is correct', () => {
        const txs = [
          new StockTransaction({ side: 'buy', price: 10.35, quantity: 2 }),
          new StockTransaction({ side: 'buy', price: 9.70, quantity: 8 }),
        ];
        expect(StockTransaction.averageCost(txs)).toEqual(9.83);
      });
    });
  });

});

describe('OptionTransaction', () => {

})