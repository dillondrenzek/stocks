"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const PAGE_SEPARATOR = '\n\n';
const COLUMN_SEPARATOR = '|';
const LINE_SEPARATOR = '\n';
const SUBLINE_SEPARATOR = '__';
const WORD_THRESHOLD = 10;
// const COLUMN_THRESHOLD = 50;
const LINE_THRESHOLD = 9;
var PageType;
(function (PageType) {
    PageType["AccountActivity"] = "ACCOUNT ACTIVITY";
    PageType["PortfolioSummary"] = "PORTFOLIO SUMMARY";
    PageType["Unknown"] = "UNKNOWN";
})(PageType || (PageType = {}));
function readRobinhoodPdf(path) {
    const dataBuffer = fs_1.default.readFileSync(path);
    const renderPage = (pageData) => {
        // check documents https://mozilla.github.io/pdf.js/
        const renderOptions = {
            // replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
            // normalizeWhitespace: true,
            // do not attempt to combine same line TextItem's. The default value is `false`.
            disableCombineTextItems: true
        };
        function getTextItemsInArea(textContent, [startX, startY] = [30, 420], [endX, endY] = [1000, 0]) {
            return textContent.items.filter((item) => {
                const { str, transform } = item;
                const [a, b, c, d, itemX, itemY] = transform;
                return !(str && (itemX < startX ||
                    itemY > startY ||
                    itemX > endX ||
                    itemY < endY));
            });
        }
        function parseArea(textContent, [startX, startY] = [0, 1000], [endX, endY] = [1000, 0]) {
            // console.log('textContent', textContent);
            let lastY;
            let lastX;
            let columns = [];
            let text = '';
            const DEBUG = false;
            for (const item of textContent.items) {
                const { str, transform } = item;
                const [a, b, c, d, itemX, itemY] = transform;
                if (!str ||
                    itemX < startX ||
                    itemY > startY ||
                    itemX > endX ||
                    itemY < endY) {
                    continue;
                }
                if (!lastY) {
                    text += str;
                }
                else if (lastY - LINE_THRESHOLD > itemY) {
                    // Y: create new line
                    text += (DEBUG) ? ` ## [${lastX.toFixed(2)}, ${lastY.toFixed(2)}] ${LINE_SEPARATOR}[${itemX.toFixed(2)}, ${itemY.toFixed(2)}] ## ${str}`
                        : `${LINE_SEPARATOR}${str}`;
                    if (columns.indexOf(itemX) === -1) {
                        columns.push(itemX);
                        // columns = _.sortBy(columns);
                        // console.log(str, 'columns:', columns);
                    }
                    else if (columns.indexOf(itemX) === 0) {
                        // console.log('new row:', itemY, `(+${lastY - itemY})`);
                    }
                }
                else {
                    // add to current row
                    if (lastX + WORD_THRESHOLD > itemX) {
                        // item within word of last item
                        text += `${str}`;
                    }
                    else {
                        // 
                        if (columns.indexOf(itemX) === -1) {
                            columns.push(itemX);
                            // columns = _.sortBy(columns);
                            // console.log(str, 'columns:', columns);
                        }
                        else if (columns.indexOf(itemX) === 0) {
                            // console.log('new row', itemY);
                        }
                        text += `${COLUMN_SEPARATOR}${str}`;
                    }
                }
                lastX = itemX;
                lastY = itemY;
            }
            return text;
        }
        function parseStatementInfo(textContent) {
            const lines = parseLines(textContent, [500, 600], [1000, 500]);
            let result = {
                pageNumber: null,
                dateRange: null,
                accountHolder: null,
                accountAddress: null
            };
            result.pageNumber = lines[0].map((col) => col.text).join('');
            result.dateRange = lines[1].map((col) => col.text).join('');
            result.accountHolder = lines[2].map((col) => col.text).join('');
            result.accountAddress = lines[3].map((col) => col.text).join('');
            return result;
        }
        function parseLines(textContent, [startX, startY] = [30, 420], [endX, endY] = [1000, 0]) {
            const itemsInArea = getTextItemsInArea(textContent, [startX, startY], [endX, endY]);
            const tableHeaders = [];
            const rows = [];
            let lastX;
            let lastY;
            let currentRow = tableHeaders;
            const newColumn = (item) => {
                const { str, transform } = item;
                const [a, b, c, d, itemX, itemY] = transform;
                return {
                    text: str,
                    startX: itemX,
                };
            };
            const newRow = (item) => {
                return [newColumn(item)];
            };
            for (const item of itemsInArea) {
                const { str, transform } = item;
                const [a, b, c, d, itemX, itemY] = transform;
                if (!lastY || !lastX) {
                    // X: Add to New Column
                    currentRow.push(newColumn(item));
                }
                else {
                    if (itemY > lastY - LINE_THRESHOLD) {
                        // Y: Same Line
                        if (itemX < lastX + WORD_THRESHOLD) {
                            // X: Add to current column
                            const currentColumn = lodash_1.default.last(currentRow);
                            currentColumn.text += str;
                        }
                        else {
                            // X: Add to New Column
                            currentRow.push(newColumn(item));
                        }
                    }
                    else {
                        // Y: New Line
                        rows.push(newRow(item));
                        currentRow = lodash_1.default.last(rows);
                    }
                }
                lastX = itemX;
                lastY = itemY;
            }
            return [tableHeaders, ...rows];
        }
        function parseTable(textContent, [startX, startY] = [30, 420], [endX, endY] = [1000, 0]) {
            const lines = parseLines(textContent, [startX, startY], [endX, endY]);
            const tableHeaders = lines[0];
            lines.splice(0, 1);
            const tableHeadersMap = {};
            const rowData = [];
            for (const header of tableHeaders) {
                tableHeadersMap[header.startX] = header.text;
            }
            for (const row of lines) {
                const rowDataItem = {};
                for (const col of row) {
                    const key = tableHeadersMap[col.startX];
                    if (!key) {
                        // console.error('Cannot find header for column:', col);
                        continue;
                    }
                    rowDataItem[key] = col.text;
                }
                rowData.push(rowDataItem);
            }
            return rowData;
        }
        function getPageType(text) {
            if (text.includes(PageType.AccountActivity)) {
                return PageType.AccountActivity;
            }
            else if (text.includes(PageType.PortfolioSummary)) {
                return PageType.PortfolioSummary;
            }
            else {
                return PageType.Unknown;
            }
        }
        function pageTypeHasTable(type) {
            return type === PageType.AccountActivity
                || type === PageType.PortfolioSummary;
        }
        return pageData.getTextContent(renderOptions)
            .then((textContent) => {
            const statementInfo = parseStatementInfo(textContent);
            // Parse Page Type
            const pageTypeArea = parseArea(textContent, [30, 500], [1000, 444]);
            const pageType = getPageType(pageTypeArea);
            // Parse Page Data
            let pageData;
            if (pageTypeHasTable(pageType)) {
                const startY = (pageType === PageType.PortfolioSummary) ? 460
                    : (pageType === PageType.AccountActivity) ? 420
                        : 420;
                pageData = parseTable(textContent, [30, startY], [1000, 0]);
            }
            const result = {
                statementInfo,
                pageType,
                pageData
            };
            return JSON.stringify(result);
        });
    };
    return new Promise((resolve, reject) => {
        // parse pdf
        pdf_parse_1.default(dataBuffer, { pagerender: renderPage })
            .then(({ numpages, text }) => {
            resolve(text);
        })
            .catch(reject);
    });
}
exports.readRobinhoodPdf = readRobinhoodPdf;
//# sourceMappingURL=read-pdf.js.map