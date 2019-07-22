import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';

import { Logger } from './util';

// import holdingsApi = require('./holdings');
// import tradesApi = require('./trades');

// Export Router
const router = express();

// Log
router.use(Logger.logRequest);

// router.use('/holdings', holdingsApi);
// router.use('/trades', tradesApi);

export default router;
