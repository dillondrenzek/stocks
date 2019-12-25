import { PortfolioSummaryItem } from '../models/portfolio-summary';
import { AccountActivityItem } from '../models/account-activity';

export enum PageType {
  AccountActivity = 'ACCOUNT ACTIVITY',
  PortfolioSummary = 'PORTFOLIO SUMMARY',
  Unknown = 'UNKNOWN'
}

export interface StatementInfo {
  pageNumber: number;
  totalPages: number;
  startDate: string; // MM/DD/YYYY
  endDate: string; // MM/DD/YYYY
  accountHolder: string;
  accountNumber: string;
  accountAddress: string;
}

interface IParsedPDFPage {
  statementInfo: StatementInfo;
  pageType: PageType;
  pageData?: any;
}

export interface ParsedPDFAccountActivity extends IParsedPDFPage {
  pageType: PageType.AccountActivity;
  pageData: AccountActivityItem[];
}

export interface ParsedPDFPortfolioSummary extends IParsedPDFPage {
  pageType: PageType.PortfolioSummary;
  pageData: PortfolioSummaryItem[];
}

export type ParsedPDFPage = (ParsedPDFAccountActivity | ParsedPDFPortfolioSummary) | null;
export type ParsedPDFPages = ParsedPDFPage[];

export interface ParsedPDF {
  startDate: string; // MM/DD/YYYY
  endDate: string; // MM/DD/YYYY
  pages: ParsedPDFPages;
}

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