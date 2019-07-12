const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const barchartApi = require('../api/barchart-api')();
const { col } = require('../lib/table-helpers');
const { mapHttpResults } = require('../lib/http');

// Test Data
// const getHoldingsJson = require('../spec/get-holdings.json');


// Export Router
const router = express();

router.get('/', (req, res) => {
    const queryParams = req.query;
    let symbols = queryParams['symbols'];

    if (symbols && symbols.length) {
        symbols = symbols.split(',');
        barchartApi.getQuotes(symbols, (data) => {
            res.render('quotes', {
                data: mapHttpResults(data),
                tableColumns: [
                    col('Name', 'name'),
                    col('Symbol', 'symbol'),
                    col('Price', 'lastPrice', { format: 'number' }),
                    col('Chg', 'netChange', { format: 'number' }),
                    col('Chg %', 'percentChange', { format: 'percent' }),
                    col('Open', 'open', { format: 'number' }),
                    col('High', 'high', { format: 'number' }),
                    col('Low', 'low', { format: 'number' }),
                    col('Close', 'close', { format: 'number' }),
                    col('52-wk Hi', 'fiftyTwoWkHigh', { format: 'number' }),
                    col('52-wk Hi Date', 'fiftyTwoWkHighDate', { format: 'date' }),
                    col('52-wk Lo', 'fiftyTwoWkLow', { format: 'number' }),
                    col('52-wk Lo Date', 'fiftyTwoWkLowDate', { format: 'date' }),
                ]
            });
        });
    } else {
        res.render('quotes');
    }
});

module.exports = router;