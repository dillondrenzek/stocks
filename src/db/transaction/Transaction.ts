import mongoose from 'mongoose';
import * as Types from '../../lib/types';

export interface ITransaction extends Types.Transaction {}

export type ITransactionDocument = ITransaction & mongoose.Document;
