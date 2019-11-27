import express from 'express';
import { Logger, accessControlAllowOrigin } from '../util';

const api = express();

// Middleware
api.use(Logger.logRequests);
api.use(accessControlAllowOrigin('*'));

// Routes
api.use('/', () => {
  console.log('Hit / route');
});

export default api;