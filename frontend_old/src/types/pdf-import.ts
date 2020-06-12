import {AccountActivityItem} from './account-activity';
import {PortfolioSummaryItem} from './portfolio-summary';

export interface PdfImport {
  startDate: string; // MM/DD/YYYY
  endDate: string; // MM/DD/YYYY
  accountActivityItems: AccountActivityItem[];
  portfolioSummaryItems: PortfolioSummaryItem[];
  created: Date;
}

export class PdfImport {
  constructor(values?: Partial<PdfImport>) {
    Object.assign(this, values);
  }

  get accountActivityItemsCount() {
    return (Array.isArray(this.accountActivityItems) && this.accountActivityItems.length) ? this.accountActivityItems.length : 0;
  }

  get portfolioSummaryItemsCount() {
    return (Array.isArray(this.portfolioSummaryItems) && this.portfolioSummaryItems.length) ? this.portfolioSummaryItems.length : 0;
  }
}