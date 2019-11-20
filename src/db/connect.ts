import mongoose from 'mongoose';

export function connectDb(connectionString: string) {
  return mongoose.connect(connectionString, { useNewUrlParser: true });
}
