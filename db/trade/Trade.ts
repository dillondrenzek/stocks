import mongoose from 'mongoose';

export interface ITradeDocument extends mongoose.Document {
    date: Date;
    price: number;
    quantity: number;
    side: 'buy' | 'sell';
    symbol: string;
}

// Schema
const tradeSchema = new mongoose.Schema<ITradeDocument>({
    date: Date,
    price: Number,
    quantity: Number,
    side: String, // 'buy' or 'sell'
    symbol: String,
});

// Export
export const Trade = mongoose.model<ITradeDocument>('Trade', tradeSchema);
