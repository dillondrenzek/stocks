const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const holdingsRoutes = require('./routes/holdings');
const quotesRoutes = require('./routes/quotes');

app.set('port', process.env.PORT || 7000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/holdings', holdingsRoutes);
app.use('/quotes', quotesRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(app.get('port'), () => {
    console.log(`Server started. Port: ${app.get('port')}`);
});