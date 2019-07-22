import mongoose from 'mongoose';
import { IPortfolioDocument } from '../portfolio/Portfolio';

export interface ITradeDocument extends mongoose.Document {
    date: Date;
    portfolioId: IPortfolioDocument['_id'];
    price: number;
    quantity: number;
    side: 'buy' | 'sell';
    symbol: string;
    addToPortfolio ?: (id: IPortfolioDocument['_id']) => void;
}

export interface ITradeModel extends mongoose.Model<ITradeDocument> {
    // findBySymbol?: (symbol: string) => mongoose.Model<ITradeDocument>;
}

// Schema
const tradeSchema = new mongoose.Schema<ITradeDocument>({
    date: Date,
    portfolioId: String,
    price: Number,
    quantity: Number,
    side: String, // 'buy' or 'sell'
    symbol: String,
});

tradeSchema.methods.addToPortfolio = async function(id: IPortfolioDocument['_id']) {
    this.portfolioId = id;
    await this.save();
};

// Export
export const Trade = mongoose.model<ITradeDocument>('Trade', tradeSchema);
