import { expect } from 'chai';
import { withDb } from '../../spec/helpers/db-connect';

// TODO: see if we can not include DB models explicitly in these tests
import * as DB from '../../db';
import { RobinhoodPdfController } from './RobinhoodPdfController';


describe('RobinhoodPdfController', withDb(() => {

  describe('delete by id', () => {
    let pdfImport: DB.PdfImportDocument;
    let accountActivityItems: DB.AccountActivityItemDocument[];
    let portfolioSummaryItems: DB.PortfolioSummaryItemDocument[];

    let fetchedPdfImport: DB.PdfImportDocument;
    let fetchedAccountActivityItems: DB.AccountActivityItemDocument[];
    let fetchedPortfolioSummaryItems: DB.PortfolioSummaryItemDocument[];

    beforeEach(async () => {
      accountActivityItems = (await Promise.all([
        DB.AccountActivityItem.generate(),
        DB.AccountActivityItem.generate(),
        DB.AccountActivityItem.generate()
      ])).map((i) => i._id);

      // create pdf import with child models
      pdfImport = await DB.PdfImport.generate({
        accountActivityItems
      });

      await RobinhoodPdfController.deletePdfImportById(pdfImport.id);

      fetchedPdfImport = await DB.PdfImport.findById(pdfImport._id);
      fetchedAccountActivityItems = await Promise.all(accountActivityItems.map((aa) => DB.AccountActivityItem.findById(aa._id)));
    });

    it('Deletes the PdfImport instance', () => {
      expect(fetchedPdfImport).to.be.null;
    });
    it('Deletes the child account activity items', () => {
      expect(fetchedAccountActivityItems.length).to.eq(accountActivityItems.length);
      for(let item of fetchedAccountActivityItems) {
        expect(item).to.be.null;
      }
    });
    xit('Deletes the child portfolio summary items');
  });

}));