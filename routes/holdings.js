const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { col } = require('../lib/table-helpers');
const { mapHttpResults } = require('../lib/http');
const Holding = require('../models/holding.model');
const HoldingsController = require('../controllers/holdingsController');




// Export Router
const router = express();

router.get('/', (req, res) => {
    HoldingsController.getHoldings((err, holdings) => {
        if (err) throw new Error('Error getHoldings');
        res.render('holdings', {
            data: holdings,
            tableColumns: [
                col('Symbol', 'symbol'),
                col('Avg. Cost', 'avgCost', { format: 'number' }),
                col('Quantity', 'quantity', { format: 'number' }),
            ]
        });
    });
});

module.exports = router;