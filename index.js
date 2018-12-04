const express = require('express');
const bodyParser = require('body-parser');

const QuoteController = require('./controllers/quotes.controller');

const app = express();

let port = 7000;

app.get('/', (req, res) => {
    res.send('Ok');
});

app.listen(port, () => {
    console.log(`Server started. Port: ${port}`);
})