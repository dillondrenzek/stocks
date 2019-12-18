import * as DB from '../../db';
import { PortfolioSummaryItem } from '../../robinhood-pdf/models/portfolio-summary';

export class PortfolioSummaryController {

  public static async getPortfolioSummaryItems(): Promise<PortfolioSummaryItem[]> {
    const fetched = await DB.PortfolioSummaryItem
      .find({})
      .sort({date: -1});
    return fetched.map((item) => this.toPortfolioSummaryItem(item));
  }

  private static toPortfolioSummaryItem(p: DB.PortfolioSummaryItemDocument): PortfolioSummaryItem {
    if (!p) return null;

    return {
      accountType: p.accountType,
      annualIncome: p.annualIncome,
      changePercent: p.changePercent,
      equitiesOptions: p.equitiesOptions,
      mktValue: p.mktValue,
      mktValueLastPeriod: p.mktValueLastPeriod,
      portfolioPercent: p.portfolioPercent,
      price: p.price,
      qty: p.qty,
      symbol: p.symbol,
      yieldPercent: p.yieldPercent,
    }

  }

}