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
            // test data
            // const data = (getHoldingsJson && getHoldingsJson.results) ? getHoldingsJson.results : [];
            // cb(null, data);

            Holding.find((err, res) => {
                if (err) throw new Error('Error Holding.find');
                cb(null, res);
            });


        }
    }
})();

module.exports = HoldingsController;