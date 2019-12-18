import React from 'react';
import { PortfolioSummaryItem } from '../../types/portfolio-summary';
import { Table } from '../shared/table';


// function 

export interface PortfolioSummaryTableProps {
  items: PortfolioSummaryItem[]
}

export function PortfolioSummaryTable(props: PortfolioSummaryTableProps) {
  return (
    <>
      {props.items ? (
        <Table<PortfolioSummaryItem>
          columns={[
            // { key: '', label: ''}
            // { key: 'description', label: 'Description', render: (props) => <span>{props && typeof props.value === 'object' ? JSON.stringify(props.value) : (typeof props.value === 'string' || 'number') ? props.value : ''}</span> },
            // { key: 'symbol', label: 'Symbol' },
            // { key: 'price', label: 'Price' },
            // { key: 'qty', label: 'Qty' },
            // { key: 'credit', label: 'Credit' },
            // { key: 'debit', label: 'Debit' },
            // { key: 'date', label: 'Date' },
            // { key: 'transactionType', label: 'Type' },
            // { key: 'accountType', label: 'Account Type' }
          ]}
          data={props.items}
        />
      ) : null}
    </>
  );
}