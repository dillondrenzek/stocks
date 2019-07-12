// const https = require('https');


// function BarchartAPI() {
//     const apiKey = '40c4fe1f0ad3539d1a2e062c69356b8b';

//     return {
//         getQuotes
//     }

//     function getQuotes(symbolsArray, callback) {
//         if (!symbolsArray || !symbolsArray.length) {
//             console.warn('No symbols passed to getQuotes');
//         }

//         var symbols = symbolsArray.join(',');
//         var additionalFields = [
//             'fiftyTwoWkHigh',
//             'fiftyTwoWkHighDate',
//             'fiftyTwoWkLow',
//             'fiftyTwoWkLowDate'
//         ].join('%2C');

//         // TODO: dynamic `fields`
//         var url = [
//             "https://marketdata.websol.barchart.com/",
//             "getQuote.json?",
//             "apikey=" + apiKey,
//             "&symbols=" + symbols,
//             "&fields=" + additionalFields
//         ].join('');

//         https.get(url, (res) => {
//             var body = '';

//             res.on('data', function (chunk) {
//                 body += chunk;
//             });

//             res.on('end', function () {
//                 var result = JSON.parse(body);
//                 callback(result);
//             });
//         });
//     }
// }


// module.exports = function() {
//     const api = BarchartAPI();

//     return {
//         getQuotes: api.getQuotes
//     }
// };