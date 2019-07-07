import React from 'react';
import * as MUI from '@material-ui/core';
import './App.scss';

import { HoldingsTable } from './components/holdings-table/holdings-table';

import Quotes from './spec/get-quotes.json';
import Holdings from './spec/get-holdings.json';

export class App extends React.Component {
  render() {
    return (
      <MUI.Container>
        <MUI.Grid container spacing={3}>

          <MUI.Grid item xs={12}>
            test
          </MUI.Grid>

          <MUI.Grid item xs={12}>

            <HoldingsTable
              holdings={Holdings.results}
            />

          </MUI.Grid>

        </MUI.Grid>
        {/* 
        <MUI.Link href='/'>
          Link
        </MUI.Link> */}
      </MUI.Container>
    );
  }
}
