import mongoose = require('mongoose');
import { IPortfolioDocument } from '../portfolio/Portfolio';
import { IOptionTradeDocument, IStockTradeDocument, ITradeDocument } from '../trade/Trade';

// Documents

export interface IHoldingDocument extends mongoose.Document {
  symbol: string;
  trades: Array<ITradeDocument['_id']>;
  type: 'stock' | 'option';
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
