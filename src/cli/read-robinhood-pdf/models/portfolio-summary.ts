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

export function portfolioSummaryItem(values?: any): PortfolioSummaryItem {
  return {
    accountType: values['ACCT TYPE'],
    annualIncome: values['EST. ANNUAL INCOME'],
    changePercent: values['% CHANGE'],
    equitiesOptions: ((): string => {
      const str = values['EQUITIES/OPTIONS'] as string;
      return str.replace(str.match(/(Estimated Yield)\:\s\d+\.\d+\%/)[0], '');
    })(),
    mktValue: values['MKT VALUE'],
    mktValueLastPeriod: values['LAST PERIOD\'S MKT VALUE'],
    portfolioPercent: values['% OF TOTAL PORTFOLIO'],
    price: values['PRICE'],
    qty: values['QTY'],
    symbol: values['SYM/CUSIP'],
    yieldPercent: ((): string => {
      const str = values['EQUITIES/OPTIONS'];
      const word = 'Estimated Yield: ';
      const slice = str.slice(str.indexOf(word));
      return slice ? slice.replace(word, '') : null;
    })()
  }
}
