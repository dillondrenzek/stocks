import express from 'express';
import { Logger } from './util';

import portfoliosApi from './portfolios';
// import holdingsApi from './holdings';
// import tradesApi from './trades';

// Export Router
const router = express();

// Log
router.use(Logger.logRequest);

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use('/portfolios', portfoliosApi);
// router.use('/holdings', holdingsApi);
// router.use('/trades', tradesApi);

export default router;
