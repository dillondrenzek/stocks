import { resolve } from 'path';

function loadEnv(path: string) {
  // do not load an .env file
  if (process.env.NODE_ENV !== 'production') {
    const resolved = resolve(__dirname, path);

    if (!resolved) {
      throw new Error('Could not resolve .env path: ' + path);
    }

    require('dotenv').config({ path: resolved });

    if (!process.env) {
      throw new Error('Could not process .env file');
    }

    console.log('Loaded .env');
  }

  if (!process.env.MONGODB_URL) {
    throw new Error('Did not provide a MongoDB url');
  }
  
  return {
    ...process.env,
    PORT: process.env.PORT || '7000',
    MONGODB_URL: process.env.MONGODB_URL || null
  };
}

const Env = loadEnv('../.env');

export default Env;
