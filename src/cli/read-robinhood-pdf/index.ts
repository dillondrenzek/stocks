import { readRobinhoodPdf } from './pdf/read-pdf';
import { PageType } from './pdf/types';

if (!process.argv[2]) {
  throw new Error('No argv 2');
}

const filename = process.argv[2];

// read robinhood pdf from file system
readRobinhoodPdf(filename)
  .then((data) => {
    // console.log('page data', data);
    console.info('---Successfully parsed Robinhood PDF---');

    const accountActivityPages = data.filter((page) => page.pageType === PageType.AccountActivity);
    const portfolioSummaryPages = data.filter((page) => page.pageType === PageType.PortfolioSummary);

    // transform Account Activity pages

    console.log('account activity pages\n', accountActivityPages);


  });
