const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const quotes = require('./controllers/quotes.controller')();
const app = express();

app.set('port', process.env.PORT || 7000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const mapQuotes = (d) => {
    if (!d || !d.results) return [];
    return d.results;
};

const col = (label, key, {format} = {}) => {
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

app.get('/api/quotes', (req, res) => {
    const queryParams = req.query;
    let symbols = queryParams['symbols'];

    if (symbols && symbols.length) {
        symbols = symbols.split(',');
        quotes.getQuotes(symbols, (data) => {
            res.render('quote-table', {
                quotes: mapQuotes(data),
                tableColumns: [
                    col('Name', 'name'),
                    col('Symbol', 'symbol'),
                    col('Price', 'lastPrice', {format: 'number'}),
                    col('Chg', 'netChange', {format: 'number'}),
                    col('Chg %', 'percentChange', {format: 'percent'}),
                    col('Open', 'open', {format: 'number'}),
                    col('High', 'high', {format: 'number'}),
                    col('Low', 'low', {format: 'number'}),
                    col('Close', 'close', {format: 'number'}),
                    col('52-wk Hi', 'fiftyTwoWkHigh', {format: 'number'}),
                    col('52-wk Hi Date', 'fiftyTwoWkHighDate', {format: 'date'}),
                    col('52-wk Lo', 'fiftyTwoWkLow', {format: 'number'}),
                    col('52-wk Lo Date', 'fiftyTwoWkLowDate', {format: 'date'}),
                ]
            });
        });
    } else {
        res.render('quote-table');
    }  
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(app.get('port'), () => {
    console.log(`Server started. Port: ${app.get('port')}`);
})