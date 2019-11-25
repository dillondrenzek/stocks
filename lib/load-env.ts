import { resolve } from 'path';

export function loadEnv(path: string) {
  // do not load an .env file
  if (process.env.NODE_ENV !== 'production') {
    const resolved = resolve(__dirname, path);
    require('dotenv').config({ path: resolved });
    console.log('Loaded .env file!\n', resolved);
  }

  if (!process.env.MONGODB_URL) {
    throw new Error('Did not provide a MongoDB url');
  }

  process.env.PORT = process.env.PORT || '7000';
}