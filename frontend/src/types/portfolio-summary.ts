export interface PortfolioSummaryItem {
  // "EQUITIES/OPTIONS": "AdobeEstimated Yield: 0.00%", 
  equitiesOptions: string;
  yieldPercent: string;
  // "SYM/CUSIP": "ADBE", 
  symbol: string;
  // "ACCT TYPE": "Margin", 
  accountType: string;
  // "QTY": "1", 
  qty: string;
  // "PRICE": "$277.93", 
  price: string;
  // "MKT VALUE": "$277.93", 
  mktValue: string;
  // "LAST PERIOD'S MKT VALUE": "$276.25", 
  mktValueLastPeriod: string;
  // "% CHANGE": "0.61%", 
  changePercent: string;
  // "EST. ANNUAL INCOME": "$0.00", 
  annualIncome: string; // estimated
  // "% OF TOTAL PORTFOLIO": "1.87%"
  portfolioPercent: string;
}
