import { readRobinhoodPdf } from './read-pdf';

if (!process.argv[2]) {
  throw new Error('No argv 2');
}

const filename = process.argv[2];

// read robinhood pdf from file system
readRobinhoodPdf(filename)
  .then((data) => {
    console.log('page data', data);
    console.info('---Successfully parsed Robinhood PDF---');
  });
