import mongoose from 'mongoose';

export interface PortfolioSummaryItem {
  accountType: string;
  annualIncome: string; // estimated
  changePercent: string;
  equitiesOptions: string;
  mktValue: string;
  mktValueLastPeriod: string;
  portfolioPercent: string;
  price: string;
  qty: string;
  symbol: string;
  yieldPercent: string; 
}

export interface PortfolioSummaryItemStatics {
  generate: (values?: Partial<PortfolioSummaryItem>) => Promise<PortfolioSummaryItemDocument>;
}

export type PortfolioSummaryItemDocument = PortfolioSummaryItem & mongoose.Document;
export type PortfolioSummaryItemModel = PortfolioSummaryItemStatics & mongoose.Model<PortfolioSummaryItemDocument>;

const portfolioSummaryItemSchema = new mongoose.Schema<PortfolioSummaryItemDocument>({
  accountType: mongoose.SchemaTypes.String,
  annualIncome: mongoose.SchemaTypes.String,
  changePercent: mongoose.SchemaTypes.String,
  equitiesOptions: mongoose.SchemaTypes.String,
  mktValue: mongoose.SchemaTypes.String,
  mktValueLastPeriod: mongoose.SchemaTypes.String,
  portfolioPercent: mongoose.SchemaTypes.String,
  price: mongoose.SchemaTypes.String,
  qty: mongoose.SchemaTypes.String,
  symbol: mongoose.SchemaTypes.String,
  yieldPercent: mongoose.SchemaTypes.String,
});

portfolioSummaryItemSchema.statics.generate = async (values?: Partial<PortfolioSummaryItem>): Promise<PortfolioSummaryItemDocument> => {
  values = {
    accountType: 'Margin',
    annualIncome: '0',
    changePercent: '0.00%',
    equitiesOptions: 'Test equities/options',
    mktValue: 'mktValue',
    mktValueLastPeriod: 'mktValueLastPeriod',
    portfolioPercent: '0.00%',
    price: '$4.44',
    qty: '2',
    symbol: 'TEST',
    yieldPercent: '0.5%',
    ...values,
  };

  return await PortfolioSummaryItem.create(values);
}

export const PortfolioSummaryItem = mongoose.model<PortfolioSummaryItemDocument, PortfolioSummaryItemModel>('PortfolioSummaryItem', portfolioSummaryItemSchema);
