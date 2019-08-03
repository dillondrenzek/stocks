import * as MUI from '@material-ui/core';
import React from 'react';
import { Portfolio } from '../../types/portfolio';

export interface PortfoliosTableProps {
  portfolios?: Portfolio[];
}

type TableHeaders<T> = {
  [key in keyof Partial<T>]: {
    key,
    label: string;
  }
};

export class PortfoliosTable extends React.Component<PortfoliosTableProps> {

  private tableHeaders: TableHeaders<Portfolio> = {
    _id: {
      key: '_id',
      label: 'Id'
    },
    name: {
      key: 'name',
      label: 'Name'
    }
  };

  private get tableRows() {
    return this.props.portfolios ? this.props.portfolios.map(
      (h) => {
        return {

        };
      }
    ) : [];
  }

  public render() {
    const {
      portfolios
    } = this.props;
    return (
      <MUI.Table size='small'>
        <MUI.TableHead>
          <MUI.TableRow>
            {Object.keys(this.tableHeaders).map((key, i) => (
              <MUI.TableCell key={i}>{this.tableHeaders[key].label}</MUI.TableCell>
            ))}
            <MUI.TableCell></MUI.TableCell>
          </MUI.TableRow>
        </MUI.TableHead>
        <MUI.TableBody>
          {portfolios.map((holding, j) => (
            <MUI.TableRow key={j}>
              {Object.keys(this.tableHeaders).map((key, i) => (
                <MUI.TableCell key={i}>{holding[key]}</MUI.TableCell>
              ))}
              <MUI.TableCell>
                <MUI.Link>Visit</MUI.Link>
              </MUI.TableCell>
            </MUI.TableRow>
          ))}
        </MUI.TableBody>
      </MUI.Table>
    );
  }
}
