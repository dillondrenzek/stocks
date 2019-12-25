import mongoose from 'mongoose';

export interface PdfImport {
  startDate: string; // MM/DD/YYYY
  endDate: string; // MM/DD/YYYY
  accountActivityItems: any[];
  portfolioSummaryItems: any[];
  created: Date;
}

export interface PdfImportStatics {
  generate: (values?: Partial<PdfImport>) => Promise<PdfImportDocument>;
}

export type PdfImportDocument = mongoose.Document & PdfImport;
export type PdfImportModel = mongoose.Model<PdfImportDocument> & PdfImportStatics;

const pdfImportSchema = new mongoose.Schema<PdfImportDocument>({
  created: mongoose.SchemaTypes.Date,
  endDate: mongoose.SchemaTypes.String,
  startDate: mongoose.SchemaTypes.String,
  accountActivityItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'AccountActivityItem' }],
  portfolioSummaryItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'PortfolioSummaryItem' }]
});

pdfImportSchema.statics.generate = async (values?: Partial<PdfImport>): Promise<PdfImportDocument> => {
    values = {
      accountActivityItems: [],
      portfolioSummaryItems: [],
      startDate: '7/1/2019',
      endDate: '7/31/2019',
      created: new Date(),
      ...values,
    };

    return await PdfImport.create(values);
}

export const PdfImport = mongoose.model<PdfImportDocument, PdfImportModel>('PdfImport', pdfImportSchema);