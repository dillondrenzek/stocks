import fs from 'fs';
import _ from 'lodash';
import pdfParse, { } from 'pdf-parse';
import { COLUMN_SEPARATOR, LINE_SEPARATOR, LINE_THRESHOLD, WORD_THRESHOLD, PAGE_SEPARATOR } from './constants';
import { TextContent, TextItem, PageType, Column } from './types';
import { parsePageType } from './validators';

interface ParsedPDF {
  statementInfo: {
    pageNumber: number;
    totalPages: number;
    startDate: string; // MM/DD/YYYY
    endDate: string; // MM/DD/YYYY
    accountHolder: string;
    accountNumber: string;
    accountAddress: string;
  };
  pageType: PageType;
  pageData?: any;
}

interface ParsedPDFAccountActivity extends ParsedPDF {
  pageType: PageType.AccountActivity;
  pageData: AccountActivityItem[];
}

interface AccountActivityItem { 
  // "DESCRIPTION": "SPY 10/18/2019 Put $286.00", 
  description: string;
  // "SYMBOL": "SPY", 
  symbol: string;
  // "ACCT TYPE": "Margin", 
  accountType: string;
  // "TRANSACTION": "BTC", 
  transactionType: string;
  // "DATE": "10/01/2019", 
  date: string; // MM/DD/YYYY
  // "QTY": "1",
  qty: number; 
  // "PRICE": "$1.56", 
  price: number;
  // "DEBIT": "$156.00" 
  debit?: number;
  credit?: number
}

interface ParsedPDFPortfolioSummary extends ParsedPDF {
  pageType: PageType.PortfolioSummary;
  pageData: PortfolioSummaryItem[];
}

interface PortfolioSummaryItem {
  // "EQUITIES/OPTIONS": "AdobeEstimated Yield: 0.00%", 
  equitesOptions: string; 
  yieldPercent: number;
  // "SYM/CUSIP": "ADBE", 
  symbol: string;
  // "ACCT TYPE": "Margin", 
  accountType: string;
  // "QTY": "1", 
  qty: number;
  // "PRICE": "$277.93", 
  price: number;
  // "MKT VALUE": "$277.93", 
  mktValue: number;
  // "LAST PERIOD'S MKT VALUE": "$276.25", 
  mktValueLastPeriod: number;
  // "% CHANGE": "0.61%", 
  changePercent: number;
  // "EST. ANNUAL INCOME": "$0.00", 
  annualIncome: number; // estimated
  // "% OF TOTAL PORTFOLIO": "1.87%"
  portfolioPercent: number;
}

export function readRobinhoodPdf(path: string) {

  const dataBuffer = fs.readFileSync(path);

  const parsePageJson = (page: string): ParsedPDF => {
    let result: any = {};

    try {
      const parsedJson = JSON.parse(page);
      const pageType = parsePageType(parsedJson['pageType'] || null);

      const parseNumber = (text: string): number => {
        if (!text) return;
        const parsed = parseInt(text);
        return (isNaN(parsed)) ? null : parsed;
      }

      const parsePercent = (text: string): number => {
        if (!text) return;
        text = text.replace('%', '');
        const parsed = parseFloat(text);
        return (isNaN(parsed)) ? null : parsed;
      }

      const parseCurrency = (text: string): number => {
        if (!text) return;
        text = text.replace('$', '');
        const parsed = parseFloat(text);
        return (isNaN(parsed)) ? null : parsed;
      }

      // transform object
      // console.log('parsedJson', parsedJson);

      switch (pageType) {

        case PageType.AccountActivity:
          result = {
            pageType,
            statementInfo: null,
            pageData: (Array.isArray(parsedJson['pageData'])) 
              ? parsedJson['pageData'].map((data: {[key: string]: string}): AccountActivityItem => {
                  return data ? {
                    accountType: data['ACCT TYPE'],
                    credit: parseCurrency(data['CREDIT']),
                    date: data['DATE'],
                    debit: parseCurrency(data['DEBIT']),
                    description: data['DESCRIPTION'],
                    price: parseCurrency(data['PRICE']),
                    qty: parseNumber(data['QTY']),
                    symbol: data['SYMBOL'],
                    transactionType: data['TRANSACTION']
                  } : null;
                })
              : [] 
          };
          break;
        
        case PageType.PortfolioSummary:
          result = {
            pageType,
            statementInfo: null,
            pageData: (Array.isArray(parsedJson['pageData']))
              ? parsedJson['pageData'].map((data: {[key: string]: string}): PortfolioSummaryItem => {

                const parseYieldPercent = (text: string) => {
                  const word = 'Estimated Yield: ';
                  const slice = text.slice(text.indexOf(word));
                  return slice ? parsePercent(slice.replace(word, '')) : null;
                }

                return data ? {
                  accountType: data['ACCT TYPE'],
                  annualIncome: parseCurrency(data['EST. ANNUAL INCOME']),
                  changePercent: parsePercent(data['% CHANGE']),
                  equitesOptions: data['EQUITIES/OPTIONS'],
                  mktValue: parseCurrency(data['MKT VALUE']),
                  mktValueLastPeriod: parseCurrency(data['LAST PERIOD\'S MKT VALUE']),
                  portfolioPercent: parsePercent(data['% OF TOTAL PORTFOLIO']),
                  price: parseCurrency(data['PRICE']),
                  qty: parseNumber(data['QTY']),
                  symbol: data['SYM/CUSIP'],
                  yieldPercent: parseYieldPercent(data['EQUITIES/OPTIONS'])
                } : null;
              }) 
              : []
          }
          break;
        case PageType.Unknown:
        default:
          result = {
            pageType,
          }
          break;
      }

      console.log('result', result);

    } catch (err) {
      console.error('[ERR]', err);
    }

    return result;
  }

  // page is text 
  const parsePDFJson = (page: string): ParsedPDF[] => {
    const pageJsons = page.split(PAGE_SEPARATOR);
    const parsedJson = pageJsons.map(parsePageJson);

    // console.log('parsedJson', parsedJson);

    return null;
  }

  const renderPage = (pageData: any) => {
    // check documents https://mozilla.github.io/pdf.js/
    const renderOptions = {
      // replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      // normalizeWhitespace: true,
      // do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: true
    };

    function getTextItemsInArea(
      textContent: TextContent,
      [startX, startY]: number[] = [30, 420],
      [endX, endY]: number[] = [1000, 0]
    ) {
      return textContent.items.filter((item) => {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;

        return !(str && (
          itemX < startX ||
          itemY > startY ||
          itemX > endX ||
          itemY < endY
        ));
      });
    }

    function parseArea(textContent: TextContent,
      [startX, startY]: number[] = [0, 1000],
      [endX, endY]: number[] = [1000, 0]
    ): string {
      // console.log('textContent', textContent);
      let lastY;
      let lastX;
      let columns = [];
      let text = '';
      const DEBUG = false;

      const itemsInArea = getTextItemsInArea(textContent, [startX, startY], [endX, endY]);

      for (const item of itemsInArea) {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;

        if (!lastY) {
          text += str;
        } else if (lastY - LINE_THRESHOLD > itemY) {
          // Y: create new line
          text += (DEBUG) ? ` ## [${lastX.toFixed(2)}, ${lastY.toFixed(2)}] ${LINE_SEPARATOR}[${itemX.toFixed(2)}, ${itemY.toFixed(2)}] ## ${str}`
            : `${LINE_SEPARATOR}${str}`;
          if (columns.indexOf(itemX) === -1) {
            columns.push(itemX);
          }
        } else {
          // add to current row
          if (lastX + WORD_THRESHOLD > itemX) {
            // item within word of last item
            text += `${str}`;
          } else {
            // 
            if (columns.indexOf(itemX) === -1) {
              columns.push(itemX);
            }
            text += `${COLUMN_SEPARATOR}${str}`;
          }

        }

        lastX = itemX;
        lastY = itemY;
      }

      return text;
    }

    function parseStatementInfo(textContent: TextContent) {
      const lines = parseLines(textContent, [500, 600], [1000, 500]);

      let result = {
        pageNumber: null as string,
        dateRange: null as string,
        accountHolder: null as string,
        accountAddress: null as string
      };

      result.pageNumber = lines[0].map((col) => col.text).join('');
      result.dateRange = lines[1].map((col) => col.text).join('');
      result.accountHolder = lines[2].map((col) => col.text).join('');
      result.accountAddress = lines[3].map((col) => col.text).join('');

      return result;
    }

    function parseLines(textContent: TextContent,
      [startX, startY]: number[] = [30, 420],
      [endX, endY]: number[] = [1000, 0]
    ) {
      const itemsInArea = getTextItemsInArea(textContent, [startX, startY], [endX, endY]);  
      const tableHeaders: Column[] = [];
      const rows: Column[][] = [];
      let lastX: number;
      let lastY: number;
      let currentRow = tableHeaders;

      const newColumn = (item: TextItem) => {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;
        return {
          text: str,
          startX: itemX,
        }
      };

      const newRow = (item: TextItem) => {
        return [newColumn(item)];
      }

      for (const item of itemsInArea) {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;

        if (!lastY || !lastX) {
          // X: Add to New Column
          currentRow.push(newColumn(item));

        } else {
          if (itemY > lastY - LINE_THRESHOLD) {
            // Y: Same Line
            if (itemX < lastX + WORD_THRESHOLD) {
              // X: Add to current column
              const currentColumn = _.last(currentRow);
              currentColumn.text += str;
            } else {
              // X: Add to New Column
              currentRow.push(newColumn(item));
            }
          } else {
            // Y: New Line
            rows.push(newRow(item));
            currentRow = _.last(rows);
          }
        }

        lastX = itemX;
        lastY = itemY;
      }
      return [tableHeaders, ...rows];    
    }


    function parseTable(textContent: TextContent,
      [startX, startY]: number[] = [30, 420],
      [endX, endY]: number[] = [1000, 0]
    ) {

      const lines = parseLines(textContent, [startX, startY], [endX, endY]);
      const tableHeaders = lines[0];
      lines.splice(0, 1);
      const tableHeadersMap: any = {};
      const rowData = [];

      for (const header of tableHeaders) {
        tableHeadersMap[header.startX] = header.text;
      }

      for (const row of lines) {
        const rowDataItem: any = {};
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

    function getPageType(text: string): PageType {
      if (text.includes(PageType.AccountActivity)) {
        return PageType.AccountActivity;
      } else if (text.includes(PageType.PortfolioSummary)) {
        return PageType.PortfolioSummary;
      } else {
        return PageType.Unknown;
      }
    }

    function pageTypeHasTable(type: PageType): boolean {
      return type === PageType.AccountActivity
        || type === PageType.PortfolioSummary;
    }


    return pageData.getTextContent(renderOptions)
      .then((textContent: TextContent) => {

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

  }

  return new Promise<string>((resolve, reject) => {
    // parse pdf
    pdfParse(dataBuffer, { pagerender: renderPage })
      .then(({ numpages, text }: any) => {
        if (!text) {
          reject('No text came from pdfParse');
        }

        console.log('page text\n', text);
        console.log('parsed pageJson:', parsePDFJson(text));

        resolve(text);
      })
      .catch(reject);
  });
}