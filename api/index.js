const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const holdingsDb = require('./db/holdings');
const quotesDb = require('./db/quotes');


// Export Router
const router = express();

router.use('/holdings', holdingsDb);

module.exports = router;