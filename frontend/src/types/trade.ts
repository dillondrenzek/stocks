export interface Trade {
  _id?: string;
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  symbol: string;
  timestamp?: Date;
  type: 'stock' | 'option';
}

export interface StockTrade extends Trade {
  type: 'stock';
}

const defaultValues: StockTrade = {
  price: 0.00,
  quantity: 0,
  side: null,
  symbol: '',
  type: 'stock'
}

export class StockTrade {
  constructor(values: Partial<StockTrade> = defaultValues) {
    return Object.assign({}, defaultValues, values);
  }
}

