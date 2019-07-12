const Holding = require('../models/holding.model');

// Test Data
const getHoldingsJson = require('../spec/get-holdings.json');

const HoldingsController = (() => {
    return {

        createHolding: (holding, cb) => {
            Holding.create([holding], (err, res) => {
                if (err) throw new Error('Error Holding.create');
                cb(res);
            });
        },

        getHoldings: (cb) => {
            Holding.find((err, res) => {
                if (err) throw new Error('Error Holding.find');
                cb(null, res);
            });
        },

        deleteHolding: (id, cb) => {
            Holding.deleteOne({ _id: id }, (err) => {
                cb(err);
            });
        }
    }
})();

module.exports = HoldingsController;