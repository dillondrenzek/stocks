import fs from 'fs';
import _ from 'lodash';
import pdfParse, { } from 'pdf-parse';

interface TextContent {
  items: TextItem[];
}

interface TextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
}



const PAGE_SEPARATOR = '\n\n';
const COLUMN_SEPARATOR = '|';
const LINE_SEPARATOR = '\n';
const SUBLINE_SEPARATOR = '__';
const WORD_THRESHOLD = 10;
// const COLUMN_THRESHOLD = 50;
const LINE_THRESHOLD = 9;

enum PageType {
  AccountActivity = 'ACCOUNT ACTIVITY',
  PortfolioSummary = 'PORTFOLIO SUMMARY',
  Unknown = 'UNKNOWN'
}

interface Page {
  pdfPageNumber: string;
  headerInfo: string[];
  pageType: PageType;
  pageData: any;
}

interface ParsedPdf {
  numPages: number;
  pages: Page[];
}

function parseTableHeaders(lines: string[]) {
  return lines[0].split(COLUMN_SEPARATOR);
}

function parseTableRows(lines: string[]) {
  return lines.map((row) => {
    return row.split(COLUMN_SEPARATOR);
  });
}

function parsePageTable(type: PageType, lines: string[]) {
  const tableHeaders = parseTableHeaders(lines.splice(0, 1));
  const tableRows = parseTableRows(lines);
  return {
    tableHeaders,
    tableRows
  };
}

function parsePageData(type: PageType, lines: string[]) {

  switch (type) {
    case PageType.AccountActivity:
    case PageType.PortfolioSummary:
      return parsePageTable(type, lines);
    default:
      return lines;
  }
}

function parsePageNumberInfo(lines: string[]) {
  return lines[0];
}

function parsePageType(lines: string[]): PageType {
  const text = lines[0];
  if (text === PageType.AccountActivity) {
    return PageType.AccountActivity;
  } else if (text === PageType.PortfolioSummary) {
    return PageType.PortfolioSummary;
  } else {
    return PageType.Unknown;
  }
}

function parseRobinhoodPdfPage(pageText: string, pageNumber: number, pageTexts: string[]): Page {

  console.log(`\nparsing page ${pageNumber}...\n`, pageText);

  // split by line
  const lines = pageText.split(LINE_SEPARATOR);
  // console.log('-lines:', lines);

  // parse out page numbering
  const pdfPageNumber = parsePageNumberInfo(lines.splice(0, 1));
  // console.log('-pageNumberInfo:', pageNumberInfo);

  const headerInfo = lines.splice(0, 5);
  // console.log('-headerInfo:', headerInfo);

  const pageType = parsePageType(lines.splice(0, 1));
  // console.log('-pageType:', pageType);

  const pageData = parsePageData(pageType, lines);

  // console.log(pageData);

  const result: Page = {
    pdfPageNumber,
    headerInfo,
    pageType,
    pageData
  };

  // console.log('parse:', pageText);

  return result;
}

function parseRobinhoodPdfPages(pdfText: string): ParsedPdf {

  const pages = pdfText
    .split(PAGE_SEPARATOR)
    .filter((pg) => !!pg);
  // .map(parseRobinhoodPdfPage);

  return {
    numPages: pages.length,
    pages: null
  };
}

type Line = Word[];

interface Word {
  text: string;
  items: TextItem;
}

interface Column {
  text: string;
  startX: number;
  // items: TextItem[];
}

export function readRobinhoodPdf(path: string) {

  const dataBuffer = fs.readFileSync(path);
  const renderPage = (pageData) => {
    // check documents https://mozilla.github.io/pdf.js/
    const renderOptions = {
      // replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      // normalizeWhitespace: true,
      // do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: true
    };

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

      for (const item of textContent.items) {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;

        if (
          !str ||
          itemX < startX ||
          itemY > startY ||
          itemX > endX ||
          itemY < endY
        ) {
          continue;
        }

        if (!lastY) {
          text += str;
        } else if (lastY - LINE_THRESHOLD > itemY) {
          // Y: create new line
          text += (DEBUG) ? ` ## [${lastX.toFixed(2)}, ${lastY.toFixed(2)}] ${LINE_SEPARATOR}[${itemX.toFixed(2)}, ${itemY.toFixed(2)}] ## ${str}`
            : `${LINE_SEPARATOR}${str}`;
          if (columns.indexOf(itemX) === -1) {
            columns.push(itemX);
            // columns = _.sortBy(columns);
            // console.log(str, 'columns:', columns);
          } else if (columns.indexOf(itemX) === 0) {
            // console.log('new row:', itemY, `(+${lastY - itemY})`);
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
              // columns = _.sortBy(columns);
              // console.log(str, 'columns:', columns);
            } else if (columns.indexOf(itemX) === 0) {
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

    function parseTable(textContent: TextContent,
      [startX, startY]: number[] = [30, 420],
      [endX, endY]: number[] = [1000, 0]
    ): string {
      // console.log('textContent', textContent);
      const itemsInArea = textContent.items.filter((item) => {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;

        return !(str && (
          itemX < startX ||
          itemY > startY ||
          itemX > endX ||
          itemY < endY
        ));
      });

      const DEBUG = false;
      let lastX: number;
      let lastY: number;
      let text = '';

      const tableHeaders: Column[] = [];
      const rows: Column[][] = [];
      let currentRow = tableHeaders;

      const isSameLine = (itemY) => {
        return itemY > lastY - LINE_THRESHOLD;
      }

      const isSameWord = (itemX) => {
        return itemX < lastX + WORD_THRESHOLD;
      }

      const newColumn = (item: TextItem) => {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;
        return {
          text: str,
          startX: itemX,
          // items: [item]
        }
      };

      const newRow = (item: TextItem) => {
        return [newColumn(item)];
      }

      const addToCurrentColumn = (item: TextItem) => {
        const { str, transform } = item;
        const currentColumn = _.last(currentRow);
        // console.log('currentColumn', currentColumn);
        currentColumn.text += str;
        // currentColumn.items.push(item);
      };

      const addToNewColumn = (item: TextItem) => {
        currentRow.push(newColumn(item));
        // console.log('added new column to row', currentRow);
      }

      const addToCurrentRow = (item: TextItem) => {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;

        if (isSameWord(itemX)) {
          // X: Same Word
          addToCurrentColumn(item);
        } else {
          // X: Different Word
          addToNewColumn(item);
        }
      }

      const addToNewRow = (item: TextItem) => {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;

        rows.push(newRow(item));

        currentRow = _.last(rows);
      }

      console.log('items in area:', itemsInArea.length);

      for (const item of itemsInArea) {
        const { str, transform } = item;
        const [a, b, c, d, itemX, itemY] = transform;

        if (!lastY || !lastX) {
          // starts with header row
          addToNewColumn(item);

        } else {

          if (isSameLine(itemY)) {
            // Y: Same Line
            addToCurrentRow(item);
          } else {
            // Y: New Line
            addToNewRow(item);
          }

        }

        lastX = itemX;
        lastY = itemY;

      }

      console.log('- table headers:', tableHeaders);
      console.log('- rows:', rows);

      return text;
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

        // Parse Page Type
        const pageTypeArea = parseArea(textContent, [30, 500], [1000, 444]);
        const pageType = getPageType(pageTypeArea);
        console.log('page type:\n', pageType);

        // Parse Page Data
        if (pageTypeHasTable(pageType)) {
          const startY = (pageType === PageType.PortfolioSummary) ? 460
            : (pageType === PageType.AccountActivity) ? 420
              : 420;
          const renderedTable = parseTable(textContent, [30, startY], [1000, 0]);
        } else {
          console.log('No table for type');
        }
        return pageType;
      });

  }

  return new Promise<ParsedPdf>((resolve, reject) => {
    // parse pdf
    pdfParse(dataBuffer, { pagerender: renderPage })
      .then(({ numpages, text }) => {
        resolve(parseRobinhoodPdfPages(text));
      })
      .catch(reject);
  });
}