// Test Data
const getHoldingsJson = require('../spec/get-holdings.json');

const HoldingsController = (() => {
    return {
        getHoldings: (cb) => {
            // test data
            const data = (getHoldingsJson && getHoldingsJson.results) ? getHoldingsJson.results : [];
            cb(null, data);
        }
    }
})();

module.exports = HoldingsController;