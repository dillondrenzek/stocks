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
  const newQuantity = (trade.side === 'buy')
    ? holding.quantity + trade.quantity
    : holding.quantity - trade.quantity;
  const newTotalCost = (trade.side === 'buy')
    ? holdingCost + tradeCost
    : holdingCost - tradeCost;
  const newAvgCost = (newQuantity) 
    ? newTotalCost / newQuantity
    : 0;
  return Object.assign({}, holding, {
    avgCost: newAvgCost,
    quantity: newQuantity
  });
}