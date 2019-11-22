import mongoose from 'mongoose';
import { connectDb } from './connect';

class DBController {

  async connect(connectionUrl: string = process.env.MONGODB_URL) {
    return await connectDb(connectionUrl)
      .catch((err) => console.error('Failed to connect to DB:', err));
  }

}

export const dbController = new DBController();