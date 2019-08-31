import mongoose from 'mongoose';
import * as Types from '../../types';
import { ITransaction, IStockTradeDocument, IOptionTradeDocument, StockTrade, OptionTrade, IStockTrade } from '../trade';
import { Holding, Transaction } from '../../types';

// Interface

export interface IPortfolio extends Types.Portfolio {
  // holdings: Types.Holding[];
  // name: string;
  // optionTrades: Array<IOptionTradeDocument['_id']>;
  // stockTrades: Array<IStockTradeDocument['_id']>;
  fetchTransactions?: () => void;
  addTrade?: (doc: ITransaction) => Promise<IPortfolioDocument>;
  // getAllStockTrades?: () => Promise<IStockTradeDocument[]>;
  // getAllOptionTrades?: () => Promise<IOptionTradeDocument[]>;
  // removeTradeById?: (type: Types.StockOrOption, tradeId: string) => Promise<IPortfolioDocument>;
  // addOrUpdateHolding?: (holding: Holding) => Promise<IPortfolioDocument>;
  // getHoldingBySymbol?: (symbol: string) => Holding;
}

export const defaultPortfolio = (): IPortfolio => ({
  holdings: {},
  name: ''
});

export type IPortfolioDocument = IPortfolio & mongoose.Document;

// Schema

const portfolioSchema = new mongoose.Schema<IPortfolioDocument>({
  holdings: {
    type: Object,
    default: {}
  },
  name: String,
});

// Static Methods

interface PortfolioModel {
  createByName: (name: string) => IPortfolioDocument;
}

type IPortfolioDocumentModel = PortfolioModel & mongoose.Model<IPortfolioDocument>;

portfolioSchema.statics.createByName = async function(name: string) {
  const portfolio = defaultPortfolio();
  portfolio.name = name;
  return await Portfolio.create(portfolio);
};

// Instance Methods

portfolioSchema.methods.fetchTransactions = async function() {
  Object.keys(this.holdings).forEach((key) => {
    const holding: Types.Holding = this.holdings[key];
    holding.transactions.forEach(async (t: string | Transaction, index: number) => {
      if (typeof t === 'string') {
        holding.transactions[index] = await StockTrade.findById(t);
      } else if (t._id) {
        holding.transactions[index] = await StockTrade.findById(t._id);
      }
    });
  });
}

// portfolioSchema.methods.addTrade = async function(trade: ITradeDocument): Promise<IPortfolioDocument> {
//   // add Trade id to array
//   if (trade.type === 'stock') {
//     this.stockTrades.push(trade._id);
//   } else if (trade.type === 'option') {
//     this.optionTrades.push(trade._id);
//   }
//   // save
//   await this.save();

//   return this;
// };

// portfolioSchema.methods.getAllStockTrades = async function() {
//   const trades: IStockTradeDocument[] = await StockTrade.find({
//     _id: { $in: this.stockTrades }
//   });
//   return trades;
// };

// portfolioSchema.methods.getAllOptionTrades = async function() {
//   const trades: IOptionTradeDocument[] = await OptionTrade.find({
//     _id: { $in: this.optionTrades }
//   });
//   return trades;
// };

// portfolioSchema.methods.removeTradeById = async function (type: Types.StockOrOption, tradeId: string): Promise<IPortfolioDocument> {
//   const predicate = (id: string) => (id === tradeId);

//   if (type === 'stock') {
//     const index = this.stockTrades.findIndex(predicate);
//     this.stockTrades.splice(index, 1);
//     await this.save();
//   } else if (type === 'option') {
//     this.optionTrades = this.optionTrades.filter(predicate);
//     await this.save();
//   }
//   return this;
// }

// portfolioSchema.methods.addOrUpdateHolding = async function (holding: Holding) {
//   let existingHolding = this.getHoldingBySymbol(holding.symbol);
//   if (!existingHolding) {
//     this.holdings.push(holding);
//   } else {
//     existingHolding = Object.assign(existingHolding, holding);
//     let index = this.holdings.findIndex((h: Holding) => holding.symbol === h.symbol);
//     this.holdings.splice(index, 1, existingHolding);
//   }
//   await this.save();
//   return this;
// }

// portfolioSchema.methods.getHoldingBySymbol = function (symbol: string): Holding {
//   const holding: Holding = this.holdings.find((holding: Holding) => holding.symbol === symbol);
//   return holding;
// }

// portfolioSchema.methods.deleteTrade = async function (trade: ITradeDocument) {
//   const optionTrades: string[] = this.optionTrades;
//   const stockTrades: string[] = this.stockTrades;

//   if (trade.type === 'stock') {
//     // remove id from array
//     this.stockTrades = this.stockTrades.filter((tradeId: any) => { 
//       return trade.id !== tradeId.toString();
//     });
//     // save portfolio
//     await this.save();
//     // delete stock trade
//     await StockTrade.findByIdAndDelete(trade._id);

//   } else if (trade.type === 'option') {
//     // remove id from array
//     this.optionTrades = optionTrades.filter((tradeId: any) => {
//       return trade.id !== tradeId.toString();
//     });
//     // save portfolio
//     await this.save();
//     // delete option trade
//     await OptionTrade.findByIdAndDelete(trade.id);
//   }
// };

// Export Model

export const Portfolio = mongoose.model<IPortfolioDocument, IPortfolioDocumentModel>('Portfolio', portfolioSchema);
