import mongoose = require('mongoose');
import { StockOrOption } from '../types';
import { IPortfolioDocument } from '../portfolio/Portfolio';
import { ITradeDocument } from '../trade';
import { StockTrade, IStockTradeDocument } from '../trade/StockTrade';
import { OptionTrade, IOptionTradeDocument } from '../trade/OptionTrade';

// Documents

export interface IHoldingDocument extends mongoose.Document {
  symbol: string;
  trades: Array<ITradeDocument['_id']>;
  type: StockOrOption;
  addTrade?: (trade: ITradeDocument) => void;
}

// Models

export interface IHoldingModel extends mongoose.Model<IHoldingDocument> {
  findBySymbol?: (symbol: string) => mongoose.Model<IHoldingDocument>;
}

// Schema

const holdingSchema = new mongoose.Schema<IHoldingDocument>({
  symbol: String,
  trades: { type: [mongoose.Schema.Types.ObjectId] },
  type: String,
});

// Static Methods

holdingSchema.statics.findBySymbol = async function(symbol: string) {
  return await this.find({
    symbol
  });
};

// Instance Methods

holdingSchema.methods.addTrade = async function(trade: ITradeDocument) {
  this.tradeIds.push(trade.id);
  return await this.save();
};

// Export
export const Holding: IHoldingModel = mongoose.model<IHoldingDocument, IHoldingModel>('Holding', holdingSchema);
