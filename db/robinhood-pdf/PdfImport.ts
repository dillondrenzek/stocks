import mongoose, { mongo } from 'mongoose';

export interface PdfImport {
  startDate: string; // MM/DD/YYYY
  endDate: string; // MM/DD/YYYY
  accountActivityItems: any[];
  portfolioSummaryItems: any[];
  created: Date;
}

export type PdfImportDocument = PdfImport & mongoose.Document;

const pdfImportSchema = new mongoose.Schema<PdfImportDocument>({
  created: mongoose.SchemaTypes.Date,
  endDate: mongoose.SchemaTypes.String,
  startDate: mongoose.SchemaTypes.String,
  accountActivityItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'AccountActivityItem' }],
  portfolioSummaryItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'PortfolioSummaryItem' }]
});

export const PdfImport = mongoose.model<PdfImportDocument>('PdfImport', pdfImportSchema);