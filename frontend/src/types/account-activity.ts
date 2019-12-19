export enum AccountType {
  None = 'None',
  Margin = 'Margin'
}

export enum TransactionType {
  // Stocks
  Buy = 'Buy',
  Sell = 'Sell',
  // Dividend
  CDIV = 'CDIV',
  // ACH Deposit
  ACH = 'ACH', 
  // Options
  BTC = 'BTC',
  STC = 'STC',
  BTO = 'BTO',
  STO = 'STO',
}

export interface AccountActivityItem {
  // "DESCRIPTION": "SPY 10/18/2019 Put $286.00", 
  description: string | Object;
  // "SYMBOL": "SPY", 
  symbol: string;
  // "ACCT TYPE": "Margin", 
  accountType: AccountType;
  // "TRANSACTION": "BTC", 
  transactionType: TransactionType;
  // "DATE": "10/01/2019", 
  date: string; // MM/DD/YYYY
  // "QTY": "1",
  qty: number;
  // "PRICE": "$1.56", 
  price: number;
  // "DEBIT": "$156.00" 
  debit?: number;
  credit?: number
}

export class AccountActivityItem {

  constructor(values: Partial<AccountActivityItem>) {
    Object.assign(this, values);
  }

  public get formattedDescription(): string {
    if (!this.description) {
      return null;
    }

    switch (this.transactionType) {

      case TransactionType.BTC:
      case TransactionType.BTO:
      case TransactionType.STC:
      case TransactionType.STO: {
        if (typeof this.description === 'object') {
          const { expDate, callPut, strikePrice } = this.description as { expDate: string; callPut: string; strikePrice: string; };
          return `${strikePrice} ${callPut} ${expDate}`;
        }
        return '';
      }
      case TransactionType.Buy:
      case TransactionType.Sell: {
        if (typeof this.description === 'object') {
          const { name } = this.description as { name: string; };
          return `${name}`;
        }
        return '';
      }

      case TransactionType.CDIV: {
        if (typeof this.description === 'object') {
          const { shareCount, rate } = this.description as { shareCount: string; rD: string; pD: string; rate: string; };
          return `Dividend: $${rate} per ${shareCount} shares`;
        }
        return '';
      }
      case TransactionType.ACH:
      default:
        return this.description.toString();
    }
    
  }
}