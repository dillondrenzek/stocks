export enum AccountType {
  None = 'None',
  Margin = 'Margin'
}

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

export interface AccountActivityItem {
  // "DESCRIPTION": "SPY 10/18/2019 Put $286.00", 
  description: string | Object;
  // "SYMBOL": "SPY", 
  symbol: string;
  // "ACCT TYPE": "Margin", 
  accountType: AccountType;
  // "TRANSACTION": "BTC", 
  transactionType: TransactionType;
  // "DATE": "10/01/2019", 
  date: string; // MM/DD/YYYY
  // "QTY": "1",
  qty: number;
  // "PRICE": "$1.56", 
  price: number;
  // "DEBIT": "$156.00" 
  debit?: number;
  credit?: number
}