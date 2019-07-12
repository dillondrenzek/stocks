const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const holdingsDb = require('./holdings');
const quotesDb = require('./quotes');


// Export Router
const router = express();

router.use('/holdings', holdingsDb);

module.exports = router;