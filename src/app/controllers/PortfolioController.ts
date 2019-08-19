import * as DB from '../../db';
import * as Types from '../../types';
// import { Holding, OptionTrade, Portfolio, StockTrade, Trade } from '../../types';
import { calculateHolding } from '../portfolio';

export class PortfolioController {

  public async createPortfolioWithName(name: string): Promise<Types.Portfolio> {
    const portfolio = await DB.Portfolio.createByName(name);
    return portfolio;
  }

  public async getPortfolios(): Promise<DB.IPortfolioDocument[]> {
    const portfolios = await DB.Portfolio.find();
    return portfolios;
  }

  public async getPortfolioById(id: string): Promise<DB.IPortfolioDocument> {
    const portfolio = await DB.Portfolio.findById(id);
    return portfolio;
  }

  public async deletePortfolioById(id: string): Promise<DB.IPortfolioDocument> {
    try {
      const removed = await DB.Portfolio.findByIdAndDelete(id);
      return removed;
    } catch (error) {
      // console.error('Error deleting portfolio:', error);
      return null;
    }
  }

  public async addTradeToPortfolio(trade: Types.Trade, portfolioId: string) {

    // save trade
    let newTrade: DB.ITradeDocument;
    let portfolio: DB.IPortfolioDocument = await DB.Portfolio.findById(portfolioId);

    try {
      switch (trade.type) {
        case 'stock':
          newTrade = await DB.StockTrade.create(trade);
          break;
        case 'option':
          newTrade = await DB.OptionTrade.create(trade);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }

    await portfolio.addTrade(newTrade);

    // get Holding by symbols
    const holding: Types.Holding = this.findHoldingBySymbol(trade.symbol, portfolio);
    let newHolding: Types.Holding;

    // if holding doesn't exist, create it
    if (!holding) {
      newHolding = calculateHolding([newTrade]);
    } else {
      newHolding = calculateHolding([newTrade], holding);
    }

    portfolio = this.addOrUpdateHoldingForPortfolio(newHolding, portfolio);

    await portfolio.save();
  }

  private addOrUpdateHoldingForPortfolio(holding: Types.Holding, portfolio: DB.IPortfolioDocument): DB.IPortfolioDocument {
    let existingHolding = this.findHoldingBySymbol(holding.symbol, portfolio);
    if (!existingHolding) {
      portfolio.holdings.push(holding);
    } else {
      existingHolding = Object.assign(existingHolding, holding);
    }
    return portfolio;
  } 

  private async calculateHoldingForSymbol(symbol: string): Promise<Types.Holding> {
    const stockTrades = await DB.StockTrade.findBySymbol(symbol) ;
    const holding = calculateHolding(stockTrades);
    return holding;
  }

  private findHoldingBySymbol(symbol: string, portfolio: Types.Portfolio): Types.Holding {
    return portfolio.holdings.find((holding) => holding.symbol === symbol);
  }

  public async getStockTradesForPortfolioById(id: string): Promise<Types.StockTrade[]> {
    const portfolio = await DB.Portfolio.findById(id);
    const trades = await portfolio.getAllStockTrades();
    return trades;
  }

  public async getOptionTradesForPortfolioById(id: string): Promise<Types.OptionTrade[]> {
    const portfolio = await DB.Portfolio.findById(id);
    const trades = await portfolio.getAllOptionTrades();
    return trades;
  }



  public async deleteStockTradeForPortfolioById(tradeId: string, portfolioId: string): Promise<void> {
    const portfolio = await DB.Portfolio.findById(portfolioId);
    const trade = await DB.StockTrade.findById(tradeId);

    // remove trade from portfolio
    await portfolio.removeTradeById(trade.type, trade.id);

    // delete trade
    await DB.StockTrade.findByIdAndDelete(tradeId);

    // recalculate corresponding holding
    const holding: Types.Holding = await this.calculateHoldingForSymbol(trade.symbol);
    await this.addOrUpdateHoldingForPortfolio(holding, portfolio);
    
  }

}
