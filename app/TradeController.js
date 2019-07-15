const Holding = require('../db/holding/Holding');
const Trade = require('../db/trade/Trade');

class TradeController {

    async createTrade(trade) {
        // get Holding by symbol

        return await Trade.create([trade]);
    }

    async getTrades() {
        return await Trade.find();
    }

    async deleteTradeById(id) {
        return await Trade.deleteOne({ _id: id });
    }

}

module.exports = TradeController;
