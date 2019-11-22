import { resolve } from 'path';

export function loadEnv() {
  // do not load an .env file
  if (process.env.NODE_ENV !== 'production') {
    const path = resolve(__dirname, '../../.env');
    require('dotenv').config({ path });
    console.log('Loaded .env file!\n', path);
  }

  if (!process.env.MONGODB_URL) {
    throw new Error('Did not provide a MongoDB url');
  }

  process.env.PORT = process.env.PORT || '7000';
}