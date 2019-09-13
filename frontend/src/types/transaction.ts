import * as Types from '../../../src/lib/types';

export type Transaction = Types.Transaction;

export interface StockTransaction extends Types.StockTransaction {
  date: string; 
}
export interface OptionTransaction extends Types.OptionTransaction {}

export class StockTransaction {
  static get defaultValues(): StockTransaction {
    return {
      ...{
        price: 0.00,
        quantity: 0,
        side: 'buy',
        symbol: '',
        type: 'stock',
        date: new Date().toISOString()
      }
    };
  }
  constructor(values: Partial<StockTransaction> = StockTransaction.defaultValues) {
    return Object.assign({}, StockTransaction.defaultValues, values);
  }
}

export class OptionTransaction {
  static get defaultValues(): OptionTransaction {
    return {
      ...{
        price: 0.00,
        quantity: 0,
        side: null,
        symbol: '',
        type: 'option',
        callPut: null,
        expirationDate: new Date(),
        strikePrice: 0.00,
        date: null
      }
    };
  }

  constructor(values: Partial<OptionTransaction> = OptionTransaction.defaultValues) {
    return Object.assign({}, OptionTransaction.defaultValues, values);
  }
}
