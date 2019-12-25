import express from 'express';
import portfoliosApi from './portfolios-api';
import accountActivityApi from './account-activity-api';
import portfolioSummaryApi from './portfolio-summary-api';
import robinhoodPdfApi from './pdf-import-api';

const router = express();

// Router
router.use('/portfolios', portfoliosApi);
router.use('/account-activity', accountActivityApi);
router.use('/portfolio-summary', portfolioSummaryApi);
router.use('/robinhood-pdf', robinhoodPdfApi);

export default router;