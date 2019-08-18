import { Holding, Trade } from './types';

// - currentState: Holding
// - trades: Trade[] (sorted by Date)
export function calculateHolding(trades: Trade[], currentState: Holding = { avgCost: 0, quantity: 0, symbol: null }): Holding {
  let result = currentState;

  trades.forEach((trade: Trade) => {
    result.symbol = trade.symbol;
    result = addTradeToHolding(trade, result);
  });

  return result;
}

function addTradeToHolding(trade: Trade, holding: Holding = { avgCost: 0, quantity: 0, symbol: null }): Holding {
  const tradeCost = trade.price * trade.quantity;
  const holdingCost = holding.avgCost * holding.quantity;
  const newQuantity = trade.quantity + holding.quantity;
  const newAvgCost = (tradeCost + holdingCost) / newQuantity;
  return Object.assign({}, holding, {
    avgCost: newAvgCost,
    quantity: newQuantity
  });
}