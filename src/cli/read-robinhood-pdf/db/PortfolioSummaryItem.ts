import mongoose from 'mongoose';

export interface PortfolioSummaryItem {
  accountType: string;
  annualIncome: number; // estimated
  changePercent: number;
  equitiesOptions: string;
  mktValue: number;
  mktValueLastPeriod: number;
  portfolioPercent: number;
  price: number;
  qty: number;
  symbol: string;
  yieldPercent: number; 
}

export type PortfolioSummaryItemDocument = PortfolioSummaryItem & mongoose.Document;

const portfolioSummaryItemSchema = new mongoose.Schema<PortfolioSummaryItemDocument>({
  accountType: mongoose.SchemaTypes.String,
  annualIncome: mongoose.SchemaTypes.Number,
  changePercent: mongoose.SchemaTypes.Number,
  equitiesOptions: mongoose.SchemaTypes.String,
  mktValue: mongoose.SchemaTypes.Number,
  mktValueLastPeriod: mongoose.SchemaTypes.Number,
  portfolioPercent: mongoose.SchemaTypes.Number,
  price: mongoose.SchemaTypes.Number,
  qty: mongoose.SchemaTypes.Number,
  symbol: mongoose.SchemaTypes.String,
  yieldPercent: mongoose.SchemaTypes.Number,
});

export const PortfolioSummaryItem = mongoose.model<PortfolioSummaryItemDocument>('PortfolioSummaryItem', portfolioSummaryItemSchema);
