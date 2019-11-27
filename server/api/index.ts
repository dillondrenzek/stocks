import express from 'express';
import { Logger, accessControlAllowOrigin } from '../util';
import portfoliosApi from './portfolios';

const router = express();

// Router
router.use('/portfolios', portfoliosApi);

export default router;