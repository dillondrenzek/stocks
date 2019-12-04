import * as DB from '../../db';
import * as Types from '../../src/lib/types';

export class StockTransactionController {

  public static async saveTransaction(tx: Types.Transaction): Promise<Types.StockTransaction> {
    if (tx.type === 'stock') {
      const created = await DB.StockTransaction.create(tx);
      return this.toTransaction(created);
    }
  }

  public static async deleteTransaction(tx: Types.Transaction): Promise<void> {
    if (tx.type === 'stock') {
      const id = (typeof tx._id === 'string') ? tx._id : (tx as DB.IStockTransactionDocument).id;
      await DB.StockTransaction.findByIdAndDelete(id);
      return;
    }
  }

  public static async getTransactionById(id: string): Promise<Types.StockTransaction> {
    let tx: DB.IStockTransactionDocument;

    try {
      tx = await DB.StockTransaction.findById(id);

      if (!tx) {
        throw new Error('Could not find transaction by id: ' + id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      return this.toTransaction(tx);
    }
  }

  public static async getTransactionsByIds(ids: string[]): Promise<Types.StockTransaction[]> {
    try {
      const promisesArray = ids.map(async (id) => await this.getTransactionById(id));
  
      return await Promise.all(promisesArray);
    } catch (e) {
      console.error(e);
    }
  }

  private static toTransaction(p: DB.IStockTransactionDocument): Types.StockTransaction {
    if (!p) return null;
    return {
      _id: p.id,
      date: p.date,
      price: p.price,
      quantity: p.quantity,
      side: p.side,
      symbol: p.symbol,
      type: p.type,
    }
  }

}