import * as MUI from '@material-ui/core';
import React from 'react';
import { Holding } from '../../types/portfolio';

export interface HoldingsTableProps {
  holdings?: Holding[];
}

type TableHeaders<T> = Array<{
    key: keyof Partial<T>,
    label: string;
  }>;

const tableHeaders: TableHeaders<Holding> = [
  { key: 'symbol', label: 'Symbol' },
  { key: 'transactions', label: 'Transactions' }
];

export default function HoldingTable({ holdings }: HoldingsTableProps) {
  

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
          <MUI.TableRow key={j}>
            {tableHeaders.map(({key}) => (
              <MUI.TableCell key={key}>{holding[key]}</MUI.TableCell>
            ))}
          </MUI.TableRow>
        ))) : null}
      </MUI.TableBody>
    </MUI.Table>
  );
}

