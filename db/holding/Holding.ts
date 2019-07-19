import mongoose from 'mongoose';

export interface IHolding extends mongoose.Document {
    cost: number;
    portfolioId: string;
    quantity: number;
    symbol: string;
    tradeIds: string[];
    addPortfolio: (portfolioId: string) => void;
    addTrade: (tradeId: string) => void;
}

// Schema
const holdingSchema = new mongoose.Schema<IHolding>({
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

// Instance Methods
holdingSchema.methods.addPortfolio = async function(portfolioId: string) {
    this.portfolioId = portfolioId;
    await this.save();
};

holdingSchema.methods.addTrade = async function(tradeId: string) {
    this.tradeIds.push(tradeId);
    await this.save();
};

// Export
export default mongoose.model<IHolding>('Holding', holdingSchema);
