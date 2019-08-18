import mongoose from 'mongoose';
import { ITradeDocument, IStockTradeDocument, IOptionTradeDocument, StockTrade, OptionTrade, IStockTrade, ITrade } from '../trade';

// Interface
export interface Holding {
  symbol: string;
  averageCost: number;
  quantity: number;
}

export interface IPortfolio {
  holdings: Array<Holding>;
  name: string;
  optionTrades: Array<IOptionTradeDocument['_id']>;
  stockTrades: Array<IStockTradeDocument['_id']>;
  addTrade?: (doc: ITradeDocument) => void;
  getAllStockTrades?: () => Promise<IStockTradeDocument[]>;
  getAllOptionTrades?: () => Promise<IOptionTradeDocument[]>;
  deleteTrade?: (doc: ITradeDocument) => void;
}

export const defaultPortfolio = (): IPortfolio => ({
  holdings: [],
  optionTrades: [],
  stockTrades: [],
  name: ''
});

export type IPortfolioDocument = IPortfolio & mongoose.Document;

// Schema

const portfolioSchema = new mongoose.Schema<IPortfolioDocument>({
  holdings: Array, // Objects
  name: String,
  optionTrades: Array,
  stockTrades: Array,
});

// Static Methods

interface PortfolioModel {
  createByName: (name: string) => IPortfolioDocument;
}

type IPortfolioDocumentModel = PortfolioModel & mongoose.Model<IPortfolioDocument>;

portfolioSchema.statics.createByName = async function(name: string) {
  return await Portfolio.create({
    name,
    stockTrades: [],
    optionTrades: [],
    holdings: []
  });
};

// Instance Methods

portfolioSchema.methods.addTrade = async function(trade: ITradeDocument) {
  // add Trade id to array
  if (trade.type === 'stock') {
    this.stockTrades.push(trade._id);
  } else if (trade.type === 'option') {
    this.optionTrades.push(trade._id);
  }


  // find holding
  const existingHoldingIndex = this.holdings.findIndex((holding: Holding) => {
    return holding.symbol === trade.symbol;
  });

  if (existingHoldingIndex !== -1) {
    const existingHolding: Holding = this.holdings[existingHoldingIndex];
    const updatedHolding: Holding = Object.assign({}, existingHolding)
    // update existing
    this.holdings.splice(existingHoldingIndex, 1, updatedHolding);
  } else {

  }

  // save
  await this.save();
};

portfolioSchema.methods.getAllStockTrades = async function() {
  const trades: IStockTradeDocument[] = await StockTrade.find({
    _id: { $in: this.stockTrades }
  });
  return trades;
};

portfolioSchema.methods.getAllOptionTrades = async function() {
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

export const Portfolio = mongoose.model<IPortfolioDocument, IPortfolioDocumentModel>('Portfolio', portfolioSchema);
