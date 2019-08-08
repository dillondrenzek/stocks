import React from 'react';
import { StockTrade } from '../../types/trade';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../shared';

export interface StockTradesTableProps {
  trades?: StockTrade[];
}

type TableHeaders<T> = Array<{
    key: keyof Partial<T>,
    label: string;
  }>;

export class StockTradesTable extends React.Component<StockTradesTableProps> {

  private tableHeaders: TableHeaders<StockTrade> = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'price', label: 'Price' },
    { key: 'side', label: 'Side' },
  ];

  public render() {
    const {
      trades
    } = this.props;
    return (
      <Table size='small'>
        <TableHead>
          <TableRow>
            {this.tableHeaders.map(({label}, i) => (
              <TableCell key={i}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade, j) => (
            <TableRow key={j}>
              {this.tableHeaders.map(({key}) => (
                <TableCell key={key}>{trade[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
