import express from 'express';
import { Logger, accessControlAllowOrigin } from './util';
import portfoliosApi from './portfolios';

// Export
const router = express();

// Middleware
router.use(Logger.logRequests);
router.use(accessControlAllowOrigin('*'));

// Router
router.use('/portfolios', portfoliosApi);

export default router;
