import * as DB from '../../db';
import * as Types from '../../lib/types';

export class OptionTransactionController {

  public static async saveTransaction(tx: Types.Transaction): Promise<Types.OptionTransaction> {
    if (tx.type !== 'option') {
      throw new Error('Cannot save a non-option transaction');
    }
    const created = await DB.OptionTransaction.create(tx);
    return this.toTransaction(created);
  }

  public static async deleteTransaction(tx: Types.Transaction): Promise<void> {
    if (tx.type !== 'option') {
      throw new Error('Cannot delete a non-option transaction');
    }
    const id = (typeof tx._id === 'string') ? tx._id : (tx as DB.IOptionTransactionDocument).id; 
    await DB.OptionTransaction.findByIdAndDelete(id);
  }

  public static async getTransactionById(id: string): Promise<Types.OptionTransaction> {
    let tx: DB.IOptionTransactionDocument;

    try {
      if (!tx) {
        tx = await DB.OptionTransaction.findById(id);
      }
      if (!tx) {
        throw new Error('Could not find transaction by id: ' + id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      return this.toTransaction(tx);
    }
  }

  public static async getTransactionsByIds(ids: string[]): Promise<Types.OptionTransaction[]> {
    try {
      const promisesArray = ids.map(async (id) => await this.getTransactionById(id));
  
      return await Promise.all(promisesArray);
    } catch (e) {
      console.error(e);
    }
  }

  private static toTransaction(p: DB.IOptionTransactionDocument): Types.OptionTransaction {
    if (!p) return null;

    if (p.type === 'option') {
      return {
        _id: p.id,
        date: p.date,
        price: p.price,
        callPut: p.callPut,
        expirationDate: p.expirationDate,
        quantity: p.quantity,
        side: p.side,
        strikePrice: p.strikePrice,
        symbol: p.symbol,
        type: p.type
      }
    }

  }

}