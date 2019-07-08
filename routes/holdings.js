const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { col } = require('../lib/table-helpers');
const { mapHttpResults } = require('../lib/http');
const Holding = require('../models/holding.model');
const HoldingsController = require('../controllers/holdingsController');




// Export Router
const router = express();

router.post('/', (req, res) => {
    const holding = req.body;

    console.log('create holding:', holding);
    HoldingsController.createHolding(holding, (result) => {
        console.log('created holding', path.resolve('./'));

        res.redirect(req.baseUrl);
        // HoldingsController.getHoldings((err, holdings) => {
        //     if (err) throw new Error('Error getHoldings');
        //     res.render('holdings', {
        //         data: holdings,
        //         tableColumns: [
        //             col('Symbol', 'symbol'),
        //             col('Avg. Cost', 'avgCost', { format: 'number' }),
        //             col('Quantity', 'quantity', { format: 'number' }),
        //         ]
        //     });
        // });
    });
});

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