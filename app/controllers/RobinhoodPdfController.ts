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