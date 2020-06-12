import { StockTransaction } from '../../../types';

// interface Errors {
//   [key: string]: string;
// }

export function validationStockTransaction(t: StockTransaction): string {
  if (!t.symbol || !t.side || !t.date || !t.price) {
    return 'Missing required fields.';
  }
  return null;
}