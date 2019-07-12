const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');
const { connectDb } = require('../db');
const app = express();

const holdingsRoutes = require('./routes/holdings');
const quotesRoutes = require('./routes/quotes');


module.exports = async function() {

    app.set('port', process.env.PORT || 7000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    // Database 
    connectDb('mongodb://localhost:27017/stocks');

    // Serve Static files
    app.use('/public', express.static(path.join(__dirname, 'public')));

    // View routes
    app.use('/api', api);
    app.use('/holdings', holdingsRoutes);
    app.use('/quotes', quotesRoutes);
    app.get('/', (req, res) => {
        res.render('index');
    });

    await app.listen(app.get('port'));

    console.log(`Server started. Port: ${app.get('port')}`);
};