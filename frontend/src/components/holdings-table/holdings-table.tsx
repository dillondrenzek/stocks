import * as MUI from '@material-ui/core';
import React from 'react';
import { Holding } from '../../types/portfolio';
import { Transaction } from '../../types/transaction';

export interface HoldingsTableProps {
  holdings?: Holding[];
  onSelectHolding?: (tx: Holding) => void;
}

type TableHeaders<T> = Array<{
    key: keyof Partial<T>,
    label: string;
    render?: (h) => React.ReactNode;
  }>;



export default function HoldingTable({ holdings, onSelectHolding }: HoldingsTableProps) {
  
  const tableHeaders: TableHeaders<Holding> = [
    {
      key: 'symbol',
      label: 'Symbol',
    },
    {
      key: 'transactions',
      label: 'Transactions',
      render: (txs: (string | Transaction)[]) => (
        <div>
          {(txs && txs.length) ? txs.length : '0'}
          {/* {txs.map((tx, i) => (
            typeof onSelectTransaction === 'function' 
            ? (<a href='#' onClick={() => null} key={i}>
              {typeof tx === 'string' ? tx : tx._id}
            </a>) 
              : <span key={i}>{typeof tx === 'string' ? tx : tx._id}</span>
          ))} */}
        </div>
      )
    }
  ];

  const handleClickRow = (h: Holding) => () => {
    onSelectHolding(h);
  }

  return (
    <MUI.Table size='small'>
      <MUI.TableHead>
        <MUI.TableRow>
          {tableHeaders.map(({label}, i) => (
            <MUI.TableCell key={i}>{label}</MUI.TableCell>
          ))}
        </MUI.TableRow>
      </MUI.TableHead>
      <MUI.TableBody>
        {holdings && holdings.length ? (holdings.map((holding, j) => (
          <MUI.TableRow key={j} onClick={handleClickRow(holding)}>
            {tableHeaders.map(({key, render}) => (
              <MUI.TableCell key={key}>
                {typeof render === 'function' ? render(holding[key]) : holding[key]}
              </MUI.TableCell>
            ))}
          </MUI.TableRow>
        ))) : null}
      </MUI.TableBody>
    </MUI.Table>
  );
}

