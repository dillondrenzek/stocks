import { connectDb, AccountActivityItem, PortfolioSummaryItem } from '../../../db';
import { ParseablePDFPages, PageType } from '../pdf';

// TODO: only save item if it doesn't already exist
async function saveAccountActivityItems(items: AccountActivityItem[]) {
  return await Promise.all(items.map(async (item) => {
    let result;
    try {
      result = await AccountActivityItem.create(item);
      console.log('Saved Account Activity:', item);
    } catch (err) {
      console.error('Error saving account activity items:', err);
      return null;
    }
    return result;
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
      return null;
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


// TODO: write a method to drop database usable via CLI
export async function dropRobinhoodPdfDb() {

  // establish connection to db
  await connectDb(process.env.MONGODB_URL);

  console.log('Dropping RobinhoodPdf DB');
  return await Promise.all([
    await AccountActivityItem.deleteMany({}),
    await PortfolioSummaryItem.deleteMany({})
  ]);
}
