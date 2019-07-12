const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { TradeController } = require('../../db');

// Export Router
const router = express();

router.delete('/:id', (req, res) => {
    // console.log('delete id:', req.params.id);
    // HoldingsController.deleteHolding(req.params.id, (err) => {
    //     if (err) {
    //         res.status(500).send('Error delete holdings');
    //         return;
    //     }
    //     res.status(200).send('Ok');
    // });
});

router.post('/', (req, res) => {
    // const holding = req.body;
    // HoldingsController.createHolding(holding, (err, result) => {
    //     res.status(200).send('Ok');
    // });
});

router.get('/', async function(req, res) {
    try {
        const trades = await TradeController.getTrades();
        res.type('application/json')
            .status(200)
            .json({
                result: trades
            });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting holdings');
    }
});

module.exports = router;