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

app.get('/api/quotes', (req, res) => {
    const queryParams = req.query;
    let symbols = queryParams['symbols'];

    if (symbols && symbols.length) {
        symbols = symbols.split(',');
        quotes.getQuotes(symbols, (data) => {
            res.render('quote-table', {
                quotes: mapQuotes(data)
            });
        });
    } else {
        res.render('quote-table');
    }  
});

app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(app.get('port'), () => {
    console.log(`Server started. Port: ${app.get('port')}`);
})