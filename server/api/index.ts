import express from 'express';
import { Logger, accessControlAllowOrigin } from '../util';
import portfoliosApi from './portfolios';

const router = express();

// Middleware
router.use(Logger.logRequests);
router.use(accessControlAllowOrigin('*'));

// Router
router.use('/portfolios', portfoliosApi);

router.use('/', () => {
  console.log('Hit / route');
});

export default router;