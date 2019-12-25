import { expect } from 'chai';
import { withDb } from '../../spec/helpers/db-connect';

describe('RobinhoodPdfController', withDb(() => {

  describe('delete by id', () => {
    it('Deletes the PdfImport instance', () => {
      expect(false).to.eq(true);
    });
    xit('Deletes the child portfolio summary items');
    xit('Deletes the child account activity items');
  });

}));