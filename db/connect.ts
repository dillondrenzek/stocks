import mongoose from 'mongoose';

export async function connectDb(connectionString: string) {

  let connection;

  try {
    connection = await mongoose.connect(connectionString, { useNewUrlParser: true });
  } catch (err) {
    console.error('Error connecting to db:', err);
  }

  return connection;
}
