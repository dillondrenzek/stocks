import mongoose, { SchemaTypes } from 'mongoose';

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
  accountType: SchemaTypes.String,
  annualIncome: SchemaTypes.Number,
  changePercent: SchemaTypes.Number,
  equitiesOptions: SchemaTypes.String,
  mktValue: SchemaTypes.Number,
  mktValueLastPeriod: SchemaTypes.Number,
  portfolioPercent: SchemaTypes.Number,
  price: SchemaTypes.Number,
  qty: SchemaTypes.Number,
  symbol: SchemaTypes.String,
  yieldPercent: SchemaTypes.Number,
});

export const PortfolioSummaryItem = mongoose.model<PortfolioSummaryItemDocument>('PortfolioSummaryItem', portfolioSummaryItemSchema);
