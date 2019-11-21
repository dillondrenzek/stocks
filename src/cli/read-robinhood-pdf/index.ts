import { loadEnv } from './load-env';
loadEnv();

import { readRobinhoodPdf } from './pdf';
import { saveRobinhoodPdf, dropRobinhoodPdfDb } from './db';



// Parse Process Args

if (!process.argv[2]) {
  throw new Error('No argv 2');
}

console.log('read-robinhood-pdf:', process.argv);

if (process.argv[2] === 'drop-robinhood-db') {

  // drop all the robinhood models
  dropRobinhoodPdfDb()
    .then(() => {
      console.info('Successfully dropped Robinhood database');
      process.exit();
    });
} else {

  const filename = process.argv[2];
  
  // read robinhood pdf from file system
  console.info('Begin reading Robinhood PDF:\n', filename);
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
}


