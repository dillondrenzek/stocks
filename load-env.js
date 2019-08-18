function loadEnv() {
  // do not load an .env file
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: __dirname + '/.env'});
  }

  if (!process.env.MONGODB_URL) {
    throw new Error('Did not provide a MongoDB url');
  }

  process.env.PORT = process.env.PORT || 7000;
}

module.exports = loadEnv();