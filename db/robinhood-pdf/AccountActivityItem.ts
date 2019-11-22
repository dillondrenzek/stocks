import mongoose from 'mongoose';

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
  accountType: mongoose.SchemaTypes.String,
  credit: mongoose.SchemaTypes.String,
  date: mongoose.SchemaTypes.String,
  debit: mongoose.SchemaTypes.String,
  description: mongoose.SchemaTypes.Mixed,
  price: mongoose.SchemaTypes.String,
  qty: mongoose.SchemaTypes.String,
  symbol: mongoose.SchemaTypes.String,
  transactionType: mongoose.SchemaTypes.String,
});

export const AccountActivityItem = mongoose.model<AccountActivityItemDocument>('AccountActivityItem', accountActivityItemSchema);
