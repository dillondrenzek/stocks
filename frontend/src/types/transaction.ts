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
      result += tx.quantity;
    });
    return result;
  }

  public static averageCost (txs: StockTransaction[]) {
    return this.totalCost(txs) / this.totalQuantity(txs);
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
