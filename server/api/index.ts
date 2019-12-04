import express from 'express';
import { Logger, accessControlAllowOrigin } from './util';
import portfoliosApi from './portfolios-api';
import accountActivityApi from './account-activity-api';
import portfolioSummaryApi from './portfolio-summary-api';

const router = express();

// Router
router.use('/portfolios', portfoliosApi);
router.use('/account-activity', accountActivityApi);
router.use('/portfolio-summary', portfolioSummaryApi)

export default router;