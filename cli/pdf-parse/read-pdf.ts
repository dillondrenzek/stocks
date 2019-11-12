import fs from 'fs';
import pdfParse from 'pdf-parse';
import _ from 'lodash';

const PAGE_SEPARATOR = '\n\n';
const COLUMN_SEPARATOR = '|';
const LINE_SEPARATOR = '__';

interface ParsedPdf {
  numPages: number;
  pages: string[];
}

export function readPdf(path: string) {

  const dataBuffer = fs.readFileSync(path);
  const renderPage = (pageData) => {
    // check documents https://mozilla.github.io/pdf.js/
    let render_options = {
      // replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: true,
      // do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: true
    }

    return pageData.getTextContent(render_options).then((textContent) => {
      // console.log('textContent', textContent);
      let lastY, lastX, text = '';
      for (let i = 0; i < textContent.items.length; i++) {
        const item = textContent.items[i];
        if (pageData.pageIndex === 2) {
          // console.log('text:', item.str, '|', 'transform', item.transform);
        }
        // line is within 10 pixels of previous
        if (lastY - item.transform[5] < 10 || !lastY) {
          // line is on different line, but still same row
          if (lastY != item.transform[5]) {
            text += ` ${LINE_SEPARATOR} `;
          }
          // character is less than 10 pixels away from previous
          if (item.transform[4] - lastX < 10 || !lastX) {
            text += item.str;
          } else {
            text += `${COLUMN_SEPARATOR}${item.str}`;
          }
        } else {
          // create new row
          text += '\n' + item.str;
        }
        lastX = item.transform[4];
        lastY = item.transform[5];
      }
      return text;
    });
  };

  return new Promise<ParsedPdf>((resolve, reject) => {
    // parse pdf
    pdfParse(dataBuffer, { pagerender: renderPage })
      .then(({ numpages, text }) => {
        resolve({
          numPages: numpages,
          pages: text.split(PAGE_SEPARATOR)
        });
      })
      .catch(reject);
  });
}