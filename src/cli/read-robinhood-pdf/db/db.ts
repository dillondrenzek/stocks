import { connectDb } from '../../../db';
import { ParseablePDFPages, PageType } from '../pdf';
import { AccountActivityItem } from './AccountActivityItem';
import { PortfolioSummaryItem } from './PortfolioSummaryItem';

// TODO: only save item if it doesn't already exist
async function saveAccountActivityItems(items: AccountActivityItem[]) {
  return await Promise.all(items.map(async (item) => {
    try {
      await AccountActivityItem.create(item);
      console.log('Saved Account Activity:', item);
    } catch (err) {
      console.error('Error saving account activity items:', err);
    }
  }));
}

// TODO: only save item if it doesn't already exist
async function savePortfolioSummaryItems(items: PortfolioSummaryItem[]) {
  return items.map(async (item) => {
    let result;
    try {
      result = await PortfolioSummaryItem.create(item);
      console.log('Saved Portfolio Summary:', item);
    } catch (err) {
      console.error('Error saving portfolio summary items:', err);
    }
    return result;
  });
}

export async function saveRobinhoodPdf(pages: ParseablePDFPages): Promise<void> {

  // establish connection to db
  await connectDb(process.env.MONGODB_URL);

  // for each page
  await Promise.all(pages.map(async (page) => {
    // - based on type: .create a new DB Item of the correct type
    switch(page.pageType) {
      case PageType.AccountActivity:
        return await saveAccountActivityItems(page.pageData);
      case PageType.PortfolioSummary:
        return await savePortfolioSummaryItems(page.pageData);
      default:
        break;
    }

  }));

}

export async function dropRobinhoodPdfDb() {
  return await Promise.all([
    AccountActivityItem.deleteMany({}),
    PortfolioSummaryItem.deleteMany({})
  ]);
}

// TODO: write a method to drop database usable via CLI