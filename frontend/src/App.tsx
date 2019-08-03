import * as MUI from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import './App.scss';

import { HoldingsTable } from './components/holdings-table/holdings-table';
import { PortfoliosTable } from './components/portfolios-table/portfolios-table';

import { Holding } from './types/holding';
import { Portfolio } from './types/portfolio';

export interface AppState {
  holdings?: Holding[];
  portfolios?: Portfolio[];
  selectedPortfolio?: Portfolio;
}

export class App extends React.Component<{}, AppState> {

  constructor(props) {
    super(props);
    this.state = {
      holdings: [],
      portfolios: [],
      selectedPortfolio: null
    };
  }

  public componentDidMount() {
    this.loadPortfolios();
  }

  public render() {
    const { holdings, portfolios, selectedPortfolio } = this.state;
    return (
      portfolios.length ? (
        <MUI.Container>
          <MUI.Grid container spacing={3}>
            <MUI.Tabs value={selectedPortfolio._id} onChange={this.onSelectPortfolio}>
              {portfolios.map((portfolio, i) => (
                <MUI.Tab key={i} label={portfolio.name} value={portfolio._id} />
              ))}
            </MUI.Tabs>
            <MUI.Grid item xs={12}>
              <MUI.Box>
                <MUI.Grid item xs={12}>
                  <MUI.Typography variant='h4'>
                    Holdings for {selectedPortfolio.name}
                  </MUI.Typography>
                </MUI.Grid>
                <MUI.Grid item xs={12}>
                  <HoldingsTable
                    holdings={holdings}
                  />
                </MUI.Grid>
              </MUI.Box>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Container>
      ) : null
    );
  }

  private loadPortfolios = () => {
    axios.get<Portfolio[]>('http://localhost:7000/api/portfolios')
      .then((res) => {
        this.setState({
          portfolios: res.data,
          selectedPortfolio: res.data[0]
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  private loadHoldings = () => {
    const id = this.state.selectedPortfolio._id;
    axios.get<Holding[]>('http://localhost:7000/api/portfolios/' + id + '/holdings')
      .then((res) => {
        console.log('res:', res);
        // this.setState({
        //   portfolios: res.data,
        //   selectedPortfolio: res.data[0]
        // });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  private onSelectPortfolio = (ev: React.ChangeEvent, value: string) => {
    const portfolio = this.state.portfolios.find((p) => p._id === value);
    this.setState({
      selectedPortfolio: portfolio
    }, this.loadHoldings);
  }
}
