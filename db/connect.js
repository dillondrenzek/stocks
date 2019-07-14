function connectDb(connectionString) {
    mongoose.connect(connectionString, { useNewUrlParser: true });
}

module.exports = {
    connectDb
};