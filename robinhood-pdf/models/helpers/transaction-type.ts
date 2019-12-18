export enum TransactionType {
  Buy = 'Buy',
  Sell = 'Sell',
  BTC = 'BTC',
  STC = 'STC',
  CDIV = 'CDIV',
  BTO = 'BTO',
  STO = 'STO',
  ACH = 'ACH', // 
}

export function isTransactionType(key: string): key is TransactionType {
  return Object.keys(TransactionType).includes(key);
}

export function getTransactionType(data: string): TransactionType {
  return isTransactionType(data) ? TransactionType[data] : null;
}
