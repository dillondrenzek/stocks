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

export type PortfolioSummaryItemDocument = PortfolioSummaryItem & mongoose.Document;

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

export const PortfolioSummaryItem = mongoose.model<PortfolioSummaryItemDocument>('PortfolioSummaryItem', portfolioSummaryItemSchema);
