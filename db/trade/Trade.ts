import mongoose from 'mongoose';

export interface ITrade extends mongoose.Document {
    date: Date;
    price: number;
    quantity: number;
    side: 'buy' | 'sell';
    symbol: string;
}

// Schema
const tradeSchema = new mongoose.Schema<ITrade>({
    date: Date,
    price: Number,
    quantity: Number,
    side: String, // 'buy' or 'sell'
    symbol: String,
});

// Export
export default mongoose.model<ITrade>('Trade', tradeSchema);
