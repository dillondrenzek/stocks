const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { TradeController } = require('../../db');

// Export Router
const router = express();

router.delete('/:id', async function(req, res) {
    const id = req.params['id'];
    try {
        const trades = await TradeController.deleteTradeById(id);
        res.status(200)
            .send('Ok');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting holdings');
    }
});

router.post('/', async function(req, res) {
    const trade = req.body;
    try {
        const trades = await TradeController.createTrade(trade);
        res.status(200)
            .send('Ok');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting holdings');
    }
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