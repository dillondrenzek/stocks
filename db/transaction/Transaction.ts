import { IStockTransaction, IStockTransactionDocument } from './StockTransaction';
import { IOptionTransaction, IOptionTransactionDocument } from './OptionTransaction';

export type ITransaction = IStockTransaction | IOptionTransaction;

export type ITransactionDocument = IStockTransactionDocument | IOptionTransactionDocument;
