import { connectDb } from '../../db';
import { PdfImport } from '../../db/robinhood-pdf/PdfImport';
import { AccountActivityItem, AccountActivityItemDocument } from '../../db/robinhood-pdf/AccountActivityItem';
import { PortfolioSummaryItem, PortfolioSummaryItemDocument } from '../../db/robinhood-pdf/PortfolioSummaryItem';

import { ParsedPDFPages, PageType, ParsedPDF, ParsedPDFAccountActivity, ParsedPDFPortfolioSummary } from './types';

export async function saveRobinhoodPdf(parsedPdf: ParsedPDF): Promise<void> {
  const { 
    endDate,
    pages,
    startDate
  } = parsedPdf;
  const accountActivityPages: ParsedPDFAccountActivity[] = pages.filter(p => p.pageType === PageType.AccountActivity) as ParsedPDFAccountActivity[];
  const portfolioSummaryPages: ParsedPDFPortfolioSummary[] = pages.filter(p => p.pageType === PageType.PortfolioSummary) as ParsedPDFPortfolioSummary[];

  try {
    
    // establish connection to db
    await connectDb(process.env.MONGODB_URL);

    // create a new pdf import
    const pdfImport = new PdfImport({
      accountActivityItems: [],
      created: new Date(),
      endDate,
      portfolioSummaryItems: [],
      startDate,
    });

    // save pdf import object
    await pdfImport.save();

    // for each page
    await Promise.all(accountActivityPages.map(async (page) => {
      let results: AccountActivityItemDocument[];
      try {
        results = await saveAccountActivityItems(page.pageData);

        pdfImport.accountActivityItems = pdfImport.accountActivityItems.concat(results.map(r => r._id));
        
      } catch (error) {
        
      }
      return results;
    }));

    await Promise.all(portfolioSummaryPages.map(async (page) => {
      let results: PortfolioSummaryItemDocument[];
      try {
        results = await savePortfolioSummaryItems(page.pageData);

        pdfImport.portfolioSummaryItems = pdfImport.portfolioSummaryItems.concat(results.map(r => r._id));
      } catch (error) {
        
      }
      return results;
    }));

    await pdfImport.save();

  } catch(error) {
    console.error(error);
  }

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

// TODO: only save item if it doesn't already exist
async function saveAccountActivityItems(items: AccountActivityItem[]): Promise<AccountActivityItemDocument[]> {
  return await Promise.all(items.map(async (item) => {
    let result: AccountActivityItemDocument;
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
async function savePortfolioSummaryItems(items: PortfolioSummaryItem[]): Promise<PortfolioSummaryItemDocument[]> {
  return await Promise.all(items.map(async (item) => {
    let result: PortfolioSummaryItemDocument;
    try {
      result = await PortfolioSummaryItem.create(item);
      console.log('Saved Portfolio Summary:', item);
    } catch (err) {
      console.error('Error saving portfolio summary items:', err);
      return null;
    }
    return result;
  }));
}
