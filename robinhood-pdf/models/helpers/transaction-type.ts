export enum TransactionType {
  Buy = 'Buy',
  Sell = 'Sell',
  BTC = 'BTC',
  STC = 'STC',
  CDIV = 'CDIV',
  BTO = 'BTO',
  STO = 'STO',
  ACH = 'ACH', // 
  TA = 'T/A',
}

export function isTransactionType(key: string): key is TransactionType {
  return Object.keys(TransactionType).includes(key) || key === 'T/A';
}

export function getTransactionType(data: string): TransactionType {
  if (data === 'T/A') {
    return TransactionType.TA;
  }
  return isTransactionType(data) ? TransactionType[data] : null;
}
