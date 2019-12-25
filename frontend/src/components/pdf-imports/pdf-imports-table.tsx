import React from 'react';
import { PdfImport } from '../../types/pdf-import';
import { Button } from '../../shared';
import { Table } from '../shared/table';


// function 

export interface PdfImportTableProps {
  items: PdfImport[];
  onDeleteRow: (id: string) => void;
}

export function PdfImportTable(props: PdfImportTableProps) {
  
  const deleteRowHandler = (id: string) => () => {
    props.onDeleteRow(id);
  };

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
            { render: ({ data }) => <Button variant='link' onClick={deleteRowHandler(data._id)}>Delete</Button> }
            // { key: 'accountType', label: 'Acct Type' },
          ]}
          data={props.items}
        />
      ) : null}
    </>
  );
}