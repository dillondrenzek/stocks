import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import {loadEnv} from '../../lib/load-env';
loadEnv('../../.env');

// import api from './api';
import { connectDb } from '../../db';

// import portfolioRoutes from '../server/routes/portfolio';
// import holdingsRoutes = require('./routes/holdings');
// import quotesRoutes = require('./routes/quotes');

export async function startServer() {
  const app = express();

  app.set('port', process.env.PORT);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // Database
  connectDb(process.env.MONGODB_URL);

  // Serve Static files
  app.use('/public', express.static(path.join(__dirname, 'public')));

  // Render index
  app.use('/', function(req, res) {
    res.render('index');
  });

  // Listen
  await app.listen(app.get('port'));
  console.log(`Server started. Port: ${app.get('port')}`);
}

startServer();