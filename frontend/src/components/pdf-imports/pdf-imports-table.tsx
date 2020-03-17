import React from 'react';
import { PdfImport } from '../../types/pdf-import';
import { Button, DropdownButton, Dropdown } from '../../shared';
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
            { key: 'startDate', label: 'Start Date' },
            { key: 'endDate', label: 'End Date' },
            { key: 'accountActivityItemsCount', label: '# of Account Activity Items' },
            { key: 'portfolioSummaryItemsCount', label: '# of Portfolio Summary Items' },
            { key: 'created' },
            { render: ({ data }) => (
              <Button as='link' onClick={deleteRowHandler(data._id)}>Delete</Button>
            )},
            { render: ({ data }) => (
              <DropdownButton
                title='Add to Portfolio'
                id={`row-${data._id}`}
                size='sm'
                variant='secondary'
              >
                <Dropdown.Item onClick={deleteRowHandler(data._id)}>Delete</Dropdown.Item>
              </DropdownButton>
            )}
          ]}
          data={props.items}
        />
      ) : null}
    </>
  );
}