const Trade = require('../models/Trade');

class TradeController {
    async createTrade(trade) {
        return await Trade.create([trade]);
    }

    async getTrades() {
        return await Trade.find();
    }

    async deleteTradeById(id) {
        return await Trade.deleteOne({ _id: id });
    }
}

module.exports = (() => { return new TradeController(); })();