const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const holdingsApi = require('./holdings');
const tradesApi = require('./trades');
const quotesApi = require('./quotes');


// Export Router
const router = express();

router.use('/holdings', holdingsApi);
router.use('/trades', tradesApi);

module.exports = router;