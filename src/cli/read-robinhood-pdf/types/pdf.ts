import { PortfolioSummaryItem } from './robinhood/portfolio-summary';
import { AccountActivityItem } from './robinhood/account-activity';

export enum PageType {
  AccountActivity = 'ACCOUNT ACTIVITY',
  PortfolioSummary = 'PORTFOLIO SUMMARY',
  Unknown = 'UNKNOWN'
}

export interface ParsedPDF {
  statementInfo: {
    pageNumber: number;
    totalPages: number;
    startDate: string; // MM/DD/YYYY
    endDate: string; // MM/DD/YYYY
    accountHolder: string;
    accountNumber: string;
    accountAddress: string;
  };
  pageType: PageType;
  pageData?: any;
}

export interface ParsedPDFAccountActivity extends ParsedPDF {
  pageType: PageType.AccountActivity;
  pageData: AccountActivityItem[];
}

export interface ParsedPDFPortfolioSummary extends ParsedPDF {
  pageType: PageType.PortfolioSummary;
  pageData: PortfolioSummaryItem[];
}

export type ParseablePDFPage = (ParsedPDFAccountActivity | ParsedPDFPortfolioSummary) | null;

export type ParseablePDFPages = ParseablePDFPage[];

export interface TextContent {
  items: TextItem[];
}

export interface TextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
}

export interface Column {
  text: string;
  startX: number;
  // items: TextItem[];
}