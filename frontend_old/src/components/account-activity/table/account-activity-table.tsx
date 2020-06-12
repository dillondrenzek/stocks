import React from 'react';
import { AccountActivityItem, TransactionType } from '../../../types/account-activity';
import { Table } from '../../shared/table';

export interface DescriptionCellProps {
  data: AccountActivityItem;
  value: Object | string | number;
}

function DescriptionCell(props: DescriptionCellProps) {
  if (!props) {
    return null;
  }
  
  return (
    <span>
      {props.data.formattedDescription}
    </span>
  );
}

export interface AccountActivityTableProps {
  items: AccountActivityItem[]
}

export function AccountActivityTable(props: AccountActivityTableProps) {
  return (
    <>
      {props.items ? (
        <Table<AccountActivityItem>
          columns={[
            { key: 'symbol', label: 'Symbol' },
            { key: 'description', label: 'Description', render: (props) => <DescriptionCell {...props} /> },
            { key: 'price', label: 'Price' },
            { key: 'qty', label: 'Qty' },
            { key: 'credit', label: 'Credit' },
            { key: 'debit', label: 'Debit' },
            { key: 'date', label: 'Date' },
            { key: 'transactionType', label: 'Type' },
            { key: 'accountType', label: 'Account Type' }
          ]}
          data={props.items}
        />
      ) : null}
    </>
  );
}