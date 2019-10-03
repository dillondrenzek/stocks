import * as MUI from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import { Transaction } from '../../../types/transaction';
import { Button } from '../../../shared';

export interface TransactionsTableProps {
  transactions: (string | Transaction)[];
  onDeleteTransaction?: (txId: string) => void;
}

type TableHeaders<T> = Array<{
  key: keyof Partial<T>,
  label: string;
  render?: (h) => React.ReactNode;
}>;

export default function StockTransactionTable({ transactions, onDeleteTransaction }: TransactionsTableProps) {

  const tableHeaders: TableHeaders<Transaction> = [
    {
      key: 'symbol',
      label: 'Symbol',
    },
    {
      key: 'side',
      label: 'Side',
    },
    {
      key: 'quantity',
      label: 'Quantity',
    },
    {
      key: 'price',
      label: 'Price',
    },
    {
      key: 'date',
      label: 'Date',
      render: (dateString: string) => {
        const formatted = moment(dateString).format('MMM D YY');
        return (
          <span>{formatted}</span>
        )
      }
    }
  ];

  const handleClickDelete = (id: string) => (ev: React.MouseEvent) => {
    console.log('clicked delete transaction:', id);

    if (typeof onDeleteTransaction === 'function') {
      onDeleteTransaction(id);
    }
  }

  const id = (tx: string | Transaction): string => {
    return typeof tx === 'string' ? tx : tx._id;
  }

  return (transactions ? (
    <table className='table table-bordered'>
      <thead>
        <tr>
          {tableHeaders.map(({ label }, i) => (
            <th key={i}>{label}</th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {transactions.length ? (transactions.map((tx, j) => (
          <tr key={j}>
            {tableHeaders.map(({ key, render }) => (
              tx ? (
                <td key={key}>
                  {typeof render === 'function' ? render(tx[key]) : tx[key]}
                </td>
              ) : null
            ))}
            <td>
              <Button variant='link' onClick={handleClickDelete(id(tx))}>Delete</Button>
            </td>
          </tr>
        ))) : null}
      </tbody>
    </table>
  ) : null);
}

