import express from 'express';
import { Logger, accessControlAllowOrigin } from './util';

import portfoliosApi from './portfolios';

// Export Router
const router = express();

// Log
router.use(Logger.logRequest);
router.use(accessControlAllowOrigin('*'));

router.use('/portfolios', portfoliosApi);

export default router;
