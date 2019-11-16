"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_pdf_1 = require("./read-pdf");
if (!process.argv[2]) {
    throw new Error('No argv 2');
}
const filename = process.argv[2];
// read robinhood pdf from file system
read_pdf_1.readRobinhoodPdf(filename)
    .then((data) => {
    console.log('page data', data);
});
//# sourceMappingURL=index.js.map