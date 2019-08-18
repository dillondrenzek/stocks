import chai, { expect } from 'chai';
import {Trade, Holding} from './types';
import {calculateHolding} from './portfolio';


describe('calculateHolding', () => {

  // const makeTest = (trades: Trade[], symbol: string = 'TEST', runTests: (result: Holding) => void) => {
  const makeMathTest = (trades: Trade[], expectedSymbol: string, expectedAverageCost: number, expectedQuantity: number) => {
    return () => {
      let result: Holding;
  
      beforeEach(() => {
        result = calculateHolding(trades);
      });

      it('returns the correct symbol', () => {
        expect(result.symbol).to.eq(expectedSymbol);
      });

      it('returns the correct average cost', () => {
        expect(result.avgCost).to.eq(expectedAverageCost);
      });

      it('returns the correct quantity', () => {
        expect(result.quantity).to.eq(expectedQuantity);
      });
    }
  }

  describe('with no trades', makeMathTest(
    [],
    null, 0, 0
    )
  );

  describe('with one trade', makeMathTest(
    [{ symbol: 'TEST', price: 10.00, side: 'buy', quantity: 1, type: 'stock' }],
    'TEST', 10, 1
    )
  );

  describe('with two trades with equal quantity', makeMathTest(
    [
      { symbol: 'TEST', price: 10.00, side: 'buy', quantity: 1, type: 'stock' },
      { symbol: 'TEST', price: 20.00, side: 'buy', quantity: 1, type: 'stock' }
    ],
    'TEST', 15, 2
  ));

  describe('with two trades with inequal quantity', makeMathTest(
    [
      { symbol: 'TEST', price: 10.00, side: 'buy', quantity: 1, type: 'stock' },
      { symbol: 'TEST', price: 22.00, side: 'buy', quantity: 2, type: 'stock' }
    ],
    'TEST', 18, 3
  ));

});