import { resolve } from 'path';

export function loadEnv(path: string) {
  // do not load an .env file
  // if (process.env.NODE_ENV !== 'production') {
  const resolved = resolve(__dirname, path);

  if (!resolved) {
    throw new Error('Could not resolve .env path: ' + path);
  }

  console.log('Loading env at:', resolved);

  require('dotenv').config({ path: resolved });

  if (!process.env) {
    throw new Error('Could not process .env file');
  }

  // }
  
  if (!process.env.MONGODB_URL) {
    throw new Error('Did not provide a MongoDB url');
  }
  
  console.log('Loaded.');

  return {
    ...process.env,
    PORT: process.env.PORT || '7000',
    MONGODB_URL: process.env.MONGODB_URL || null
  };
}

