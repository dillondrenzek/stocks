

export enum AccountType {
  None,
  Margin
}

export enum TransactionType {
  Buy = 'Buy',
  Sell = 'Sell',
  BTC = 'BTC',
  STC = 'STC',
  CDIV = 'CDIV',
  BTO = 'BTO',
  STO = 'STO',
  ACH = 'ACH', // 
}

export interface AccountActivityItem {
  // "DESCRIPTION": "SPY 10/18/2019 Put $286.00", 
  description: string | Object;
  // "SYMBOL": "SPY", 
  symbol: string;
  // "ACCT TYPE": "Margin", 
  accountType: string;
  // "TRANSACTION": "BTC", 
  transactionType: string;
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
  constructor(values?: any) {
    const accountType = (() => {
      const data = values['ACCT TYPE'];
      if (!AccountType[data]) {
        console.error('Could not parse AccountType', data);
        return null;
      }
      return AccountType[data];
    })();

    const transactionType = ((): TransactionType => {
      const data = values['TRANSACTION'];
      if (!TransactionType[data] || typeof data !== 'string') {
        console.error('Could not parse TransactionType', data);
        return null;
      }
      return TransactionType[data];
    })();

    const description = (() => {
      if (!transactionType) {
        return null;
      }

      const data = values['DESCRIPTION'] as string;
      switch (transactionType) {
        case TransactionType.Buy:
        case TransactionType.Sell:
          const unsolicitedIndex = data.indexOf('Unsolicited');
          const name = data.split('Unsolicited')[0];
          let cusip = data.slice(unsolicitedIndex)
            .replace('Unsolicited, ', '')
            .replace('CUSIP: ', '');
          return {
            name,
            unsolicited: true,
            cusip
          }
        case TransactionType.CDIV: {
          const str = data.replace('Cash Div: ', '');
          const rD = str.match(/R\/D\s[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)[0];
          const pD = str.match(/P\/D\s[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)[0];
          const shareCount = parseInt(str.match(/[0-9]{1,}\sshares/)[0].replace('shares', ''));
          const rate = parseFloat(str.match(/at\ [0-9]{1,}\.[0-9]{1,}/)[0].replace('at', '').trim());
          return {
            rD,
            pD,
            shareCount,
            rate
          };
        }
        case TransactionType.BTO:
        case TransactionType.STO:
        case TransactionType.BTC:
        case TransactionType.STC: {
          const str = data.replace(values['SYMBOL'], '').trim();
          const expDate = str.match(/\d+\/\d+\/\d+/)[0];
          const callPut = str.match(/(Call|Put)/)[0];
          const strikePrice = parseFloat(str.match(/\$\d+\.\d+/)[0].replace('$', ''));
          return {
            expDate,
            callPut,
            strikePrice
          };
        }
        default:
          return data;
      }
    })();

    return {
      accountType,
      credit: values['CREDIT'],
      date: values['DATE'],
      debit: values['DEBIT'],
      description,
      price: values['PRICE'],
      qty: values['QTY'],
      symbol: values['SYMBOL'],
      transactionType
    };
  }
}