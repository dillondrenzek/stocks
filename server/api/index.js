const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { Logger } = require('./util');
const holdingsApi = require('./holdings');
const tradesApi = require('./trades');


// Export Router
const router = express();

// Log
router.use(Logger.logRequest);

router.use('/holdings', holdingsApi);
router.use('/trades', tradesApi);

module.exports = router;