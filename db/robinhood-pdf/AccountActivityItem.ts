import mongoose from 'mongoose';

export interface AccountActivityItem {
  accountType: string;
  credit?: string
  date: string; // MM/DD/YYYY
  debit?: string;
  description: string | Object; // different based on type
  price: string;
  qty: string;
  symbol: string;
  transactionType: string;
}

export interface AccountActivityItemStatics {
  generate: (values?: Partial<AccountActivityItem>) => Promise<AccountActivityItemDocument>;
}

export type AccountActivityItemDocument = AccountActivityItem & mongoose.Document;
export type AccountActivityItemModel = AccountActivityItemStatics & mongoose.Model<AccountActivityItemDocument>;

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

accountActivityItemSchema.statics.generate = async (values?: Partial<AccountActivityItem>): Promise<AccountActivityItemDocument> => {
  values = {
    accountType: 'Margin',
    date: '09/03/2019',
    symbol: 'TEST',
    qty: '1',
    price: '$1.23',
    description: 'Test description',
    debit: '$1.23',
    transactionType: 'Buy',
    ...values,
  };

  return await AccountActivityItem.create(values);
}

export const AccountActivityItem = mongoose.model<AccountActivityItemDocument, AccountActivityItemModel>('AccountActivityItem', accountActivityItemSchema);
