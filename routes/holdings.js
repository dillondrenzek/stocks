const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const getHoldingsJson = require('../spec/get-holdings.json');

const mapQuotes = (d) => {
    if (!d || !d.results) return [];
    return d.results;
};

const col = (label, key, { format } = {}) => {
    const formatMap = {
        number: (val) => {
            if (typeof val === 'number') {
                val = val.toString();
                let decimals = val.split('.');

                if (decimals.length === 1) {
                    decimals.push('00');
                } else if (decimals.length === 2) {
                    if (decimals[1].length === 1) {
                        decimals[1] += '0';
                    } else if (decimals[1].length >= 3) {
                        decimals[1] = decimals[1].substr(0, 2);
                    }
                }
                return decimals.join('.');
            }
            return val;
        },
        percent: (val) => {
            if (typeof val === 'number') {
                val = val.toString();
                let decimals = val.split('.');
                if (decimals.length === 1) {
                    decimals.push('00');
                } else if (decimals.length === 2) {
                    if (decimals[1].length === 1) decimals[1] += '0';
                }
                return decimals.join('.') + '%';
            }
            return val + '%';
        }
    }
    return {
        label,
        key,
        format,
        formatFn: format && formatMap[format] ? formatMap[format] : val => val
    };
};

const router = express();

router.get('/', (req, res) => {
    const data = getHoldingsJson;

    res.render('holdings', {
        quotes: mapQuotes(data),
        tableColumns: [
            col('Symbol', 'symbol'),
            col('Avg. Cost', 'avgCost', { format: 'number' }),
            col('Quantity', 'quantity', { format: 'number' }),
        ]
    });
});

module.exports = router;