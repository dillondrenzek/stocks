const https = require('https');


function BarchartAPI() {
    const apiKey = '40c4fe1f0ad3539d1a2e062c69356b8b';

    return {
        getQuotes
    }

    function getQuotes(symbolsArray, callback) {
        if (!symbolsArray || !symbolsArray.length) {
            console.log('No symbols passed to getQuotes:', symbolsArray);
        }

        var symbols = symbolsArray.join(',');

        // TODO: dynamic `fields`
        var url = [
            "https://marketdata.websol.barchart.com/",
            "getQuote.json?",
            "apikey=" + apiKey,
            "&symbols=" + symbols,
            "&fields=fiftyTwoWkHigh%2CfiftyTwoWkHighDate%2CfiftyTwoWkLow%2CfiftyTwoWkLowDate"
        ].join('');

        https.get(url, (res) => {
            var body = '';

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () {
                var result = JSON.parse(body);
                callback(result);
            });
        });
    }
}


module.exports = function() {
    const api = BarchartAPI();

    return {
        getQuotes: api.getQuotes
    }
};