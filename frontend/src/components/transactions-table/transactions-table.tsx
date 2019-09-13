import * as MUI from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import { Holding } from '../../types/portfolio';
import { Transaction } from '../../types/transaction';

export interface TransactionsTableProps {
  transactions: (string | Transaction)[];
}

type TableHeaders<T> = Array<{
  key: keyof Partial<T>,
  label: string;
  render?: (h) => React.ReactNode;
}>;



export default function TransactionTable({ transactions }: TransactionsTableProps) {

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

  return (
    <MUI.Table size='small'>
      <MUI.TableHead>
        <MUI.TableRow>
          {tableHeaders.map(({ label }, i) => (
            <MUI.TableCell key={i}>{label}</MUI.TableCell>
          ))}
        </MUI.TableRow>
      </MUI.TableHead>
      <MUI.TableBody>
        {transactions && transactions.length ? (transactions.map((tx, j) => (
          <MUI.TableRow key={j}>
            {tableHeaders.map(({ key, render }) => (
              tx ? (
                <MUI.TableCell key={key}>
                  {typeof render === 'function' ? render(tx[key]) : tx[key]}
                </MUI.TableCell>
              ) : null
            ))}
          </MUI.TableRow>
        ))) : null}
      </MUI.TableBody>
    </MUI.Table>
  );
}

