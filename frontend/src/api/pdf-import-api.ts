import http from '../lib/http';
import { PdfImport } from '../types/pdf-import';

export const PdfImportApi = {
  getPdfImports: (cb: (items: PdfImport[]) => void) => {
    http.get<PdfImport[]>('http://localhost:7000/api/pdf-imports')
      .then((res) => cb(res.data.map((x) => new PdfImport(x))))
      .catch(console.error);
  }
};
