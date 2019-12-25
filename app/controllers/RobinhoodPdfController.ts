import * as DB from '../../db';
import { PdfImport } from '../../robinhood-pdf/models/pdf-import';

export class RobinhoodPdfController {

  public static async getPdfImports(): Promise<PdfImport[]> {
    const fetched = await DB.PdfImport
      .find({})
      .populate('accountActivityItems')
      .populate('portfolioSummaryItems')
      .exec();
    return fetched.map((val) => this.toPdfImport(val));
  }

  public static async deletePdfImportById(id: string): Promise<void> {
    const removee = await DB.PdfImport.findById(id);

    // if it exists ...
    if (removee) {

      // remove all child models
      await Promise.all(removee.accountActivityItems.map((id) => DB.AccountActivityItem.findByIdAndDelete(id)));
      await Promise.all(removee.portfolioSummaryItems.map((id) => DB.PortfolioSummaryItem.findByIdAndDelete(id)));

      // remove pdf import
      await removee.remove();
    }
  }

  private static toPdfImport(i: DB.PdfImportDocument): PdfImport {
    return {
      startDate: i.startDate,
      endDate: i.endDate,
      accountActivityItems: i.accountActivityItems,
      portfolioSummaryItems: i.portfolioSummaryItems,
      created: i.created
    };
  }

}