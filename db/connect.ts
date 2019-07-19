import mongoose from 'mongoose';

export function connectDb(connectionString: string) {
    mongoose.connect(connectionString, {
        useNewUrlParser: true
    });
}
