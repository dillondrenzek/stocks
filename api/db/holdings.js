const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { col } = require('../../lib/table-helpers');
const { mapHttpResults } = require('../../lib/http');
const Holding = require('../../models/holding.model');
const HoldingsController = require('../../controllers/holdingsController');

// Export Router
const router = express();

router.delete('/:id', (req, res) => {
    console.log('delete id:', req.params.id);
    HoldingsController.deleteHolding(req.params.id, (err) => {
        if (err) {
            res.status(500).send('Error delete holdings');
            return;
        }
        res.status(200).send('Ok');
    });
});

router.post('/', (req, res) => {
    const holding = req.body;
    HoldingsController.createHolding(holding, (err, result) => {
        res.status(200).send('Ok');
    });
});

router.get('/', (req, res) => {
    HoldingsController.getHoldings((err, holdings) => {
        if (err) {
            res.status(500).send('Error getting holdings');
            return;
        }

        res
            .type('application/json')
            .status(200)
            .json({
                result: holdings
            });
    });
});

module.exports = router;