import { loadEnv } from './load-env';
loadEnv('../.env');

import express from 'express';
import { Logger, accessControlAllowOrigin } from './util';
import api from './api';

const server = express();
const port = process.env.PORT;

// Middleware
server.use(Logger.logRequests);
server.use(accessControlAllowOrigin('*'));


// Routes
server.use('/api', api);
server.use('/', (req, res) => {
  res.send('Index route 5');
});


if(!port) {
  throw new Error('Invalid port: ' + port);
}

server.listen(port, () => {
  console.log('Started listening on port', port);
});
