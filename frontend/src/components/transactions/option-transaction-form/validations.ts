import { OptionTransaction } from '../../../types';

// interface Errors {
//   [key: string]: string;
// }

export function validationOptionTransaction(t: OptionTransaction): string {
  if (!t.symbol || !t.side || !t.date || !t.price) {
    return 'Missing required fields.';
  }
  return null;
}