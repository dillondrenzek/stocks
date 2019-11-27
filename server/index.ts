import express from 'express';
import { Logger, accessControlAllowOrigin } from './util';

import { loadEnv } from './load-env';
loadEnv('../.env');

const server = express();
const port = process.env.PORT;

// Middleware
server.use(Logger.logRequests);
server.use(accessControlAllowOrigin('*'));

// Routes
server.use('/', (req, res) => {
  res.send('Index route');
});


if(!port) {
  throw new Error('Invalid port: ' + port);
}

server.listen(port, () => {
  console.log('Started listening on port', port);
});
