import * as MUI from '@material-ui/core';
import React from 'react';
import {Holding} from '../../types/portfolio';

export interface HoldingsTableProps {
  holdings?: Holding[];
}

type TableHeaders<T> = Array<{
    key: keyof Partial<T>,
    label: string;
  }>;

export class HoldingsTable extends React.Component<HoldingsTableProps> {

  private tableHeaders: TableHeaders<Holding> = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'avgCost', label: 'Avg. Cost' },
  ];

  public render() {
    const {
      holdings
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
          {holdings.map((holding, j) => (
            <MUI.TableRow key={j}>
              {this.tableHeaders.map(({key}) => (
                <MUI.TableCell key={key}>{holding[key]}</MUI.TableCell>
              ))}
            </MUI.TableRow>
          ))}
        </MUI.TableBody>
      </MUI.Table>
    );
  }
}
