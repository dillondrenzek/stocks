import mongoose from 'mongoose';
import { connectDb } from './connect';

class DBController {

  constructor(private connectionUrl: string) {
    connectDb(connectionUrl);
  }

}

export const dbController = new DBController(process.env.MONGODB_URL);