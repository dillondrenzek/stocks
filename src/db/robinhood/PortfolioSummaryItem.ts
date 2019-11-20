import mongoose, { SchemaTypes, Schema } from 'mongoose';

export interface PortfolioSummaryItem {
  // "EQUITIES/OPTIONS": "AdobeEstimated Yield: 0.00%", 
  equitiesOptions: string;
  yieldPercent: number;
  // "SYM/CUSIP": "ADBE", 
  symbol: string;
  // "ACCT TYPE": "Margin", 
  accountType: string;
  // "QTY": "1", 
  qty: number;
  // "PRICE": "$277.93", 
  price: number;
  // "MKT VALUE": "$277.93", 
  mktValue: number;
  // "LAST PERIOD'S MKT VALUE": "$276.25", 
  mktValueLastPeriod: number;
  // "% CHANGE": "0.61%", 
  changePercent: number;
  // "EST. ANNUAL INCOME": "$0.00", 
  annualIncome: number; // estimated
  // "% OF TOTAL PORTFOLIO": "1.87%"
  portfolioPercent: number;
}

export type PortfolioSummaryItemDocument = PortfolioSummaryItem & mongoose.Document;

const portfolioSummaryItemSchema = new mongoose.Schema<PortfolioSummaryItemDocument>({
  equitiesOptions: SchemaTypes.String,
  yieldPercent: SchemaTypes.Number,
  symbol: SchemaTypes.String,
  accountType: SchemaTypes.String,
  qty: SchemaTypes.Number,
  price: SchemaTypes.Number,
  mktValue: SchemaTypes.Number,
  mktValueLastPeriod: SchemaTypes.Number,
  changePercent: SchemaTypes.Number,
  annualIncome: SchemaTypes.Number,
  portfolioPercent: SchemaTypes.Number,
});

export const PortfolioSummaryItem = mongoose.model<PortfolioSummaryItemDocument>('PortfolioSummaryItem', portfolioSummaryItemSchema);
