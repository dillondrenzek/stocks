import * as MUI from '@material-ui/core';
import React from 'react';
import { StockTrade } from '../../types/trade';

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
      <MUI.Table size='small'>
        <MUI.TableHead>
          <MUI.TableRow>
            {this.tableHeaders.map(({label}, i) => (
              <MUI.TableCell key={i}>{label}</MUI.TableCell>
            ))}
          </MUI.TableRow>
        </MUI.TableHead>
        <MUI.TableBody>
          {trades.map((trade, j) => (
            <MUI.TableRow key={j}>
              {this.tableHeaders.map(({key}) => (
                <MUI.TableCell key={key}>{trade[key]}</MUI.TableCell>
              ))}
            </MUI.TableRow>
          ))}
        </MUI.TableBody>
      </MUI.Table>
    );
  }
}
