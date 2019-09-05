import * as DB from '../../db';
import * as Types from '../../lib/types';

export class TradeController {

  public static async addTransaction(tx: Types.Transaction): Promise<Types.Transaction> {
    if (tx.type === 'stock') {
      return await DB.StockTransaction.create(tx);
    } else if (tx.type === 'option') {
      return await DB.OptionTransaction.create(tx);
    }
  }

}