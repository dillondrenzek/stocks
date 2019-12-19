import { AccountType, isAccountType } from './helpers/account-type';
import { TransactionType, isTransactionType } from './helpers/transaction-type';

export function getTransactionType(data: string): TransactionType {
  return isTransactionType(data) ? TransactionType[data] : null;
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

export function accountActivityItem(values?: any): AccountActivityItem {

  // first parse transaction type to help with parsing logic
  const transactionType = ((): TransactionType => {
    const data = values['TRANSACTION'] as string;
    if (typeof data !== 'string' || !isTransactionType(data)) {
      console.error('Could not parse TransactionType', data);
      return null;
    }
    return TransactionType[data];
  })();

  // return instance
  return {

    accountType: (() => {
      const data = values['ACCT TYPE'] as string;
      if (typeof data !== 'string' || !isAccountType(data)) {
        console.error('Could not parse AccountType', data);
        return null;
      }
      return AccountType[data];
    })(),

    credit: values['CREDIT'],
    date: values['DATE'],
    debit: values['DEBIT'],

    description: (() => {
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
          const shareCount = str.match(/[0-9]{1,}\sshares/)[0].replace('shares', '');
          const rate = str.match(/at\ [0-9]{1,}\.[0-9]{1,}/)[0].replace('at', '').trim();
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
          const strikePrice = str.match(/\$\d+\.\d+/)[0];
          return {
            expDate,
            callPut,
            strikePrice
          };
        }
        default:
          return data;
      }
    })(),


    price: values['PRICE'],
    qty: values['QTY'],
    symbol: values['SYMBOL'],
    transactionType

  }
}
