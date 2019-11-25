import { loadEnv } from '../lib/load-env';
loadEnv('../../.env');

import { resolve } from 'path';
import { readRobinhoodPdf } from './pdf';
import { saveRobinhoodPdf, dropRobinhoodPdfDb } from './db';
import { startServer } from './api';



// Parse Process Args

if (!process.argv[2]) {
  throw new Error('No argv 2');
}

const resolveFileName = (path: string) => {
  return resolve(__dirname, path);
}

switch (process.argv[2]) {

  case 'dropDb':
    // drop all the robinhood models
    dropRobinhoodPdfDb()
    .then(() => {
      console.info('Successfully dropped Robinhood database');
      process.exit();
    });
    break;

  case 'save': {
    const filename = resolveFileName(process.argv[3]);
    readRobinhoodPdf(filename)
      .then((data) => {
        // console.log('page data', data);
        console.info('Successfully read Robinhood PDF');
    
        console.info('---Begin saving Robinhood PDF...\n');
        saveRobinhoodPdf(data)
          .then(() => {
            // data saved
            console.info('...Successfully saved Robinhood PDF---');
            process.exit();
          })
          .catch((err) => {
            console.error('FAILED to save Robinhood PDF');
            console.error('Error:', err);
          });
    
      });
    break;
  }

  case 'serve': {
    
    break;
  }

  case 'print': {
    const filename = resolveFileName(process.argv[3]);
    console.info('Begin reading Robinhood PDF:\n', filename);
    readRobinhoodPdf(filename)
      .then((data) => {
        console.info('Successfully read Robinhood PDF');
        console.log(data);
      });   
    break;
  }

  default:
    const filename = resolveFileName(process.argv[3]);
    console.info('Begin reading Robinhood PDF:\n', filename);
    readRobinhoodPdf(filename)
      .then((data) => {
        // console.log('page data', data);
        console.info('Successfully read Robinhood PDF');
      });
    break;

  
}


