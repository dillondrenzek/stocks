import * as DB from '../../db';
import { AccountActivityItem, getAccountType, getTransactionType } from '../../robinhood-pdf/models/account-activity';

export class AccountActivityController {

  public static async getAccountActivityItems(): Promise<AccountActivityItem[]> {
    const fetched = await DB.AccountActivityItem
      .find({})
      .sort({date: -1});
    return fetched.map((item) => this.toAccountActivityItem(item));
  }

  private static toAccountActivityItem(p: DB.AccountActivityItemDocument): AccountActivityItem {
    if (!p) return null;

    return {
      accountType: getAccountType(p.accountType),
      credit: p.credit,
      date: p.date,
      debit: p.debit,
      description: p.description,
      price: p.price,
      qty: p.qty,
      symbol: p.symbol,
      transactionType: getTransactionType(p.transactionType)
    }

  }

}