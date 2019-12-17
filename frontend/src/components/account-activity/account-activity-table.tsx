import React from 'react';
import { AccountActivityItem } from '../../types/account-activity';
import { Table } from '../shared/table';


export interface AccountActivityTableProps {
  items: AccountActivityItem[]
}

export function AccountActivityTable(props: AccountActivityTableProps) {
  return props.items ? (
    <Table<AccountActivityItem>
      columns={[
        { key: 'description', label: 'Description', render: (props) => <span>{props && typeof props.value === 'object' ? JSON.stringify(props.value) : ''}</span> },
        { key: 'symbol', label: 'Symbol' },
        { key: 'price', label: 'Price' },
        { key: 'qty', label: 'Qty' },
        { key: 'credit', label: 'Credit' },
        { key: 'debit', label: 'Debit' },
        { key: 'date', label: 'Date' },
        { key: 'transactionType', label: 'Type' },
        { key: 'accountType', label: 'Account Type' },
      ]}
      data={props.items}
    />
  ) : null;
}