import mongoose = require('mongoose');
import { IPortfolioDocument } from '../portfolio/Portfolio';
import { ITradeDocument } from '../trade/Trade';

export interface IHoldingDocument extends mongoose.Document {
    cost: number;
    portfolioId: IPortfolioDocument['_id'];
    quantity: number;
    symbol: string;
    tradeIds: Array<ITradeDocument['_id']>;
    addPortfolio?: (portfolioId: IPortfolioDocument['_id']) => void;
    addTrade?: (tradeId: ITradeDocument['_id']) => void;
}

export interface IHoldingModel extends mongoose.Model<IHoldingDocument> {
    findBySymbol?: (symbol: string) => mongoose.Model<IHoldingDocument>;
}

// Schema
const holdingSchema = new mongoose.Schema<IHoldingDocument>({
    cost: Number,
    portfolioId: String,
    quantity: Number,
    symbol: String,
    tradeIds: Array, // Trade._id[]
});

// Static Methods
holdingSchema.statics.findBySymbol = async function(symbol: string) {
    return await this.find({
        symbol
    });
};

holdingSchema.methods.addPortfolio = async function(portfolioId: string) {
    this.portfolioId = portfolioId;
    return await this.save();
};

holdingSchema.methods.addTrade = async function(tradeId: string) {
    this.tradeIds.push(tradeId);
    return await this.save();
};

// Instance Methods

// Export
export const Holding: IHoldingModel = mongoose.model<IHoldingDocument, IHoldingModel>('Holding', holdingSchema);
