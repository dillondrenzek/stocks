import mongoose, { SchemaTypes } from 'mongoose';

export interface AccountActivityItem {
  // "DESCRIPTION": "SPY 10/18/2019 Put $286.00", 
  description: string | Object;
  // "SYMBOL": "SPY", 
  symbol: string;
  // "ACCT TYPE": "Margin", 
  accountType: string;
  // "TRANSACTION": "BTC", 
  transactionType: string;
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

export type AccountActivityItemDocument = AccountActivityItem & mongoose.Document;

const accountActivityItemSchema = new mongoose.Schema<AccountActivityItemDocument>({
  description: SchemaTypes.Mixed,
  symbol: SchemaTypes.String,
  accountType: SchemaTypes.String,
  transactionType: SchemaTypes.String,
  date: SchemaTypes.String,
  qty: SchemaTypes.Number,
  price: SchemaTypes.Number,
  debit: SchemaTypes.Number,
  credit: SchemaTypes.Number
});

export const AccountActivityItem = mongoose.model<AccountActivityItemDocument>('AccountActivityItem', accountActivityItemSchema);
