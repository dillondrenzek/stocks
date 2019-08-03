import * as MUITable from '@material-ui/core/Table';
import React from 'react';

export interface TableProps extends MUITable.TableProps {

}

export class Table extends React.Component<TableProps, {}> {
  public render() {
    const { children } = this.props;
    return (
      <MUITable.default>
        {children}
      </MUITable.default>
    );
  }
}
