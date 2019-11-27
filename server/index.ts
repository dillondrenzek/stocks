import { loadEnv } from './load-env';
loadEnv('../.env');

import express from 'express';
import * as DB from '../db';
import { Logger, accessControlAllowOrigin } from './util';
import api from './api';

const server = express();
const port = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL

// Middleware
server.use(Logger.logRequests);
server.use(accessControlAllowOrigin('*'));

// Database connection
if (!mongodbUrl) {
  throw new Error('MongoDB Url: ' + mongodbUrl);
}
DB.connectDb(mongodbUrl);

// Routes
server.use('/api', api);


if(!port) {
  throw new Error('Invalid port: ' + port);
}

server.listen(port, () => {
  console.log('Started listening on port', port);
});
