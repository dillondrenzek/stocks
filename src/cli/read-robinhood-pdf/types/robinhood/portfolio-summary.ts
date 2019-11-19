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

const parseNumber = (text: string): number => {
  if (!text) return;
  const parsed = parseInt(text);
  return (isNaN(parsed)) ? null : parsed;
}

const parsePercent = (text: string): number => {
  if (!text) return;
  text = text.replace('%', '');
  const parsed = parseFloat(text);
  return (isNaN(parsed)) ? null : parsed;
}

const parseCurrency = (text: string): number => {
  if (!text) return;
  text = text.replace('$', '');
  const parsed = parseFloat(text);
  return (isNaN(parsed)) ? null : parsed;
}

export class PortfolioSummaryItem {
  constructor(values?: any) {

    const equitiesOptions = ((): string => {
      const str = values['EQUITIES/OPTIONS'] as string;
      return str.replace(str.match(/(Estimated Yield)\:\s\d+\.\d+\%/)[0], '');
    })();

    const yieldPercent = ((): number => {
      const str = values['EQUITIES/OPTIONS'];
      const word = 'Estimated Yield: ';
      const slice = str.slice(str.indexOf(word));
      return slice ? parsePercent(slice.replace(word, '')) : null;
    })();

    return {
      accountType: values['ACCT TYPE'],
      annualIncome: parseCurrency(values['EST. ANNUAL INCOME']),
      changePercent: parsePercent(values['% CHANGE']),
      equitiesOptions,
      mktValue: parseCurrency(values['MKT VALUE']),
      mktValueLastPeriod: parseCurrency(values['LAST PERIOD\'S MKT VALUE']),
      portfolioPercent: parsePercent(values['% OF TOTAL PORTFOLIO']),
      price: parseCurrency(values['PRICE']),
      qty: parseNumber(values['QTY']),
      symbol: values['SYM/CUSIP'],
      yieldPercent
    }
  }
}