export interface PdfImport {
  _id?: string;
  startDate: string; // MM/DD/YYYY
  endDate: string; // MM/DD/YYYY
  accountActivityItems: any[];
  portfolioSummaryItems: any[];
  created: Date;
}