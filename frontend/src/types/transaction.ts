export type BuyOrSell = 'buy' | 'sell';
export type CallOrPut = 'call' | 'put';
export type OpenOrClose = 'open' | 'close';
export type StockOrOption = 'stock' | 'option';

interface BaseTransaction {
  _id?: string;
  price: number;
  quantity: number;
  side: BuyOrSell;
  symbol: string;
  date: string; // MM-DD-YYYY
  type: StockOrOption;
}

export type Transaction = StockTransaction | OptionTransaction;

export interface StockTransaction extends BaseTransaction {
  type: 'stock';
}

export interface OptionTransaction extends BaseTransaction {
  type: 'option';
  strikePrice: number;
  callPut: CallOrPut;
  expirationDate: string; // Mth DD YY
}

export class StockTransaction implements StockTransaction {

  public static totalQuantity (txs: StockTransaction[]) {
    let result = 0;
    txs.forEach((tx) => {
      if (tx.side === 'buy') {
        result += tx.quantity;
      } else if (tx.side === 'sell') {
        result -= tx.quantity;
      }
    });
    return result;
  }

  public static averageCost (txs: StockTransaction[]) {
    let currQty = 0;
    let currAvgCost = 0;
    console.log('calc avg cost:', txs);
    txs.forEach((tx) => {
      console.log('tx', tx);
      let newQty;
      if (tx.side === 'buy') {
        newQty = currQty + tx.quantity;
        console.log('newQty', newQty);
        // average cost changes with new buys
        currAvgCost = ((currAvgCost * currQty) + tx.cost) / newQty;
        console.log('tx.cost', tx.cost);
        console.log('currQty', currQty);
        console.log('currAvgCost', currAvgCost);
      } else if (tx.side === 'sell') {
        newQty = currQty - tx.quantity;
      }
      // update currQty counter
      currQty = newQty;
    });
    console.log('result', currAvgCost);
    return currAvgCost;
  }

  public static totalCost (txs: StockTransaction[]) {
    let result = 0;
    txs.forEach((tx) => {
      result += tx.cost
    });
    return result;
  }
  
  constructor(values?: Partial<StockTransaction>) {
    const defaults = {
      price: 0.00,
      quantity: 0,
      side: 'buy',
      symbol: '',
      type: 'stock',
      date: new Date().toISOString()
    };

    Object.assign(this, defaults, values);
  }

  get cost() {
    return this.price * this.quantity;
  }
}

export class OptionTransaction {

  constructor(values?: Partial<OptionTransaction>) {
    const defaults = {
      price: 0.00,
      quantity: 0,
      side: 'buy',
      symbol: '',
      type: 'option',
      callPut: 'call',
      expirationDate: '',
      strikePrice: 0.00,
      date: new Date().toISOString()
    };
    Object.assign(this, defaults, values);
  }
}
