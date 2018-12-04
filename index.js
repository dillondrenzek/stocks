const express = require('express');
const bodyParser = require('body-parser');

const quotes = require('./controllers/quotes.controller')();

const app = express();

let port = 7000;

app.get('/', (req, res) => {

    quotes.getQuotes([
        'AAPL',
        'TTWO'
    ], (data) => {
        res.json(data);
    });

    
});

app.listen(port, () => {
    console.log(`Server started. Port: ${port}`);
})