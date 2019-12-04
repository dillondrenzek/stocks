import express from 'express';
import * as DB from '../db';
import Env from './load-env';
import { Logger, accessControlAllowOrigin } from './api/util';
import api from './api';

const server = express();

// Middleware
server.use(Logger.logRequests);
server.use(accessControlAllowOrigin('*'));

// Database connection
DB.connectDb(Env.MONGODB_URL);

// Routes
server.use('/api', api);

// Start server
server.listen(Env.PORT, () => {
  console.log('Started listening on port', Env.PORT);
});
