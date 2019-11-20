import mongoose, { SchemaTypes } from 'mongoose';

export interface AccountActivityItem {
  accountType: string;
  credit?: number
  date: string; // MM/DD/YYYY
  debit?: number;
  description: string | Object; // different based on type
  price: number;
  qty: number;
  symbol: string;
  transactionType: string;
}

export type AccountActivityItemDocument = AccountActivityItem & mongoose.Document;

const accountActivityItemSchema = new mongoose.Schema<AccountActivityItemDocument>({
  accountType: SchemaTypes.String,
  credit: SchemaTypes.Number,
  date: SchemaTypes.String,
  debit: SchemaTypes.Number,
  description: SchemaTypes.Mixed,
  price: SchemaTypes.Number,
  qty: SchemaTypes.Number,
  symbol: SchemaTypes.String,
  transactionType: SchemaTypes.String,
});

export const AccountActivityItem = mongoose.model<AccountActivityItemDocument>('AccountActivityItem', accountActivityItemSchema);
