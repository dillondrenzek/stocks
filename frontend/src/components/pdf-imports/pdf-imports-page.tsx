import React, { useEffect, useState } from 'react';
import { PdfImportApi } from '../../api/pdf-import-api';
import { Container, Row, Col } from '../../shared';
import { PdfImport } from '../../types/pdf-import';
import { PdfImportTable } from './pdf-imports-table';

// TODO: Move
const DEBUG_MODE = true;
function debug(...args: any[]) {
  if (DEBUG_MODE) {
    console.log(...args);
  }
}
function error(...args: any[]) {
  console.error(...args);
}



function usePdfImports(initialValue: PdfImport[] = []) {
  const [pdfImports, setPdfImports] = useState(initialValue);

  useEffect(() => {
    fetchPdfImports();
  }, []);

  const fetchPdfImports = () => {
    PdfImportApi.getPdfImports((imports: PdfImport[]) => {
      debug('Fetched imports:', imports);
      setPdfImports(imports);
    });
  };

  return {
    pdfImports,
    fetchPdfImports
  };
}

export function PdfImportsPage() {
  const { pdfImports, fetchPdfImports } = usePdfImports();

  const handleDeleteRow = (id: string) => {
    PdfImportApi.deletePdfImportById(id, fetchPdfImports);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Robinhood Pdf Imports</h3>
          <PdfImportTable
            items={pdfImports}
            onDeleteRow={handleDeleteRow}
          />
        </Col>
      </Row>
    </Container>
  );
}