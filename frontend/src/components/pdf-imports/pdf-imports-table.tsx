import React from 'react';
import { PdfImport } from '../../types/pdf-import';
import { Table } from '../shared/table';


// function 

export interface PdfImportTableProps {
  items: PdfImport[]
}

export function PdfImportTable(props: PdfImportTableProps) {
  return (
    <>
      {props.items ? (
        <Table<PdfImport>
          columns={[
            { key: 'created' },
            { key: 'startDate', label: 'Start Date' },
            { key: 'endDate', label: 'End Date' },
            { key: 'accountActivityItemsCount', label: '# of Account Activity Items' },
            { key: 'portfolioSummaryItemsCount', label: '# of Portfolio Summary Items' },
            // { key: 'accountType', label: 'Acct Type' },
          ]}
          data={props.items}
        />
      ) : null}
    </>
  );
}