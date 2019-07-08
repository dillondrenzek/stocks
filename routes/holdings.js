const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { col } = require('../lib/table-helpers');
const { mapHttpResults } = require('../lib/http');

// Test Data
const getHoldingsJson = require('../spec/get-holdings.json');


// Export Router
const router = express();

router.get('/', (req, res) => {
    // Use fake data
    const data = getHoldingsJson;

    res.render('holdings', {
        data: mapHttpResults(data),
        tableColumns: [
            col('Symbol', 'symbol'),
            col('Avg. Cost', 'avgCost', { format: 'number' }),
            col('Quantity', 'quantity', { format: 'number' }),
        ]
    });
});

module.exports = router;