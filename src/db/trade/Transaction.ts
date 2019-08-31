import mongoose from 'mongoose';
import * as Types from '../../types';

export interface ITransaction extends Types.Transaction {
}

export type ITransactionDocument = ITransaction & mongoose.Document;
