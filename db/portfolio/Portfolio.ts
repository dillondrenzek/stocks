import mongoose from 'mongoose';
import { IHoldingDocument } from '../holding/Holding';
import { ITradeDocument, IStockTradeDocument, IOptionTradeDocument, StockTrade, OptionTrade, IStockTrade, ITrade } from '../trade';

// Interface

export interface IPortfolio {
  holdingIds: Array<IHoldingDocument['_id']>;
  name: string;
  optionTrades: Array<IOptionTradeDocument['_id']>;
  stockTrades: Array<IStockTradeDocument['_id']>;
  addTrade?: (doc: ITradeDocument) => void;
  addHolding?: (doc: IHoldingDocument) => void;
  getAllStockTrades?: () => Promise<IStockTradeDocument[]>;
  getAllOptionTrades?: () => Promise<IOptionTradeDocument[]>;
  deleteTrade?: (doc: ITradeDocument) => void;
}

export const defaultPortfolio = (): IPortfolio => ({
  holdingIds: [],
  optionTrades: [],
  stockTrades: [],
  name: ''
});

export type IPortfolioDocument = IPortfolio & mongoose.Document;

// Schema

const portfolioSchema = new mongoose.Schema<IPortfolioDocument>({
  holdingIds: Array, // Object Ids
  name: String,
  optionTrades: Array,
  stockTrades: Array,
});

// Static Methods

portfolioSchema.statics.createDefault = async function() {
  const portfolio: IPortfolioDocument = new Portfolio(defaultPortfolio());
  return portfolio;
}

// Instance Methods

portfolioSchema.methods.addTrade = async function(trade: ITradeDocument) {
  if (trade.type === 'stock') {
    this.stockTrades.push(trade._id);
    await this.save();
  } else if (trade.type === 'option') {
    this.optionTrades.push(trade._id);
    await this.save();
  }
};

portfolioSchema.methods.addHolding = async function(holding: IHoldingDocument) {
  this.holdingIds.push(holding.id);
  await this.save();
};

portfolioSchema.methods.getAllStockTrades = async function() {
  const trades: IStockTradeDocument[] = await StockTrade.find({
    _id: { $in: this.stockTrades }
  });
  return trades;
};

portfolioSchema.methods.getAllOptionTrades = async function () {
  const trades: IOptionTradeDocument[] = await OptionTrade.find({
    _id: { $in: this.optionTrades }
  });
  return trades;
};

portfolioSchema.methods.deleteTrade = async function (trade: ITradeDocument) {
  const optionTrades: string[] = this.optionTrades;
  const stockTrades: string[] = this.stockTrades;

  if (trade.type === 'stock') {
    // remove id from array
    this.stockTrades = this.stockTrades.filter((tradeId: any) => { 
      return trade._id.toString() !== tradeId.toString();
    });
    // save portfolio
    this.save();
    // delete stock trade
    await StockTrade.findByIdAndDelete(trade._id);
  } else if (trade.type === 'option') {
    // remove id from array
    this.optionTrades = optionTrades.filter((tradeId: any) => {
      return trade._id.toString() !== tradeId.toString();
    });
    // save portfolio
    this.save();
    // delete option trade
    await OptionTrade.findByIdAndDelete(trade.id);
  }

};

// Export Model

export const Portfolio = mongoose.model<IPortfolioDocument>('Portfolio', portfolioSchema);
