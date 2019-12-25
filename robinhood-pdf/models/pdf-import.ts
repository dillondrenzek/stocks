export interface PdfImport {
  startDate: string; // MM/DD/YYYY
  endDate: string; // MM/DD/YYYY
  accountActivityItems: any[];
  portfolioSummaryItems: any[];
  created: Date;
}