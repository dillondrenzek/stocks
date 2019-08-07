import * as MUI from '@material-ui/core';
import React from 'react';
import './App.scss';

import http from './lib/http';

import { StockTradeForm } from './components/stock-trade-form/stock-trade-form';
import { StockTradesTable } from './components/trades-table/stock-trades-table';
import { HoldingsTable } from './components/holdings-table/holdings-table';
import { PortfoliosTable } from './components/portfolios-table/portfolios-table';

import { Holding } from './types/holding';
import { Portfolio } from './types/portfolio';
import { StockTrade } from './types/trade';

export interface AppState {
  holdings: Holding[];
  portfolios: Portfolio[];
  stockTrades: StockTrade[];
  stockTradeFormValue: StockTrade;
  selectedPortfolio: Portfolio;
}

export class App extends React.Component<{}, AppState> {

  constructor(props) {
    super(props);
    this.state = {
      holdings: [],
      portfolios: [],
      stockTrades: [],
      stockTradeFormValue: new StockTrade(),
      selectedPortfolio: null
    };
  }

  public componentDidMount() {
    this.loadPortfolios();
  }

  public render() {
    const { 
      holdings, 
      portfolios, 
      selectedPortfolio, 
      stockTrades,
      stockTradeFormValue
    } = this.state;
    return (
      portfolios.length ? (
        <MUI.Container>
          <MUI.Grid container spacing={3}>
            <MUI.Tabs value={selectedPortfolio._id} onChange={this.onSelectPortfolio}>
              {portfolios.map((portfolio, i) => (
                <MUI.Tab key={i} label={portfolio.name} value={portfolio._id} />
              ))}
            </MUI.Tabs>
            {/* <MUI.Grid item xs={12}>
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
            </MUI.Grid> */}
            <MUI.Grid item xs={12}>
              <StockTradeForm
                onSubmit={this.handleStockTradeFormSubmit}
                value={stockTradeFormValue}
              />
            </MUI.Grid>
            <MUI.Grid item xs={12}>
              <MUI.Box>
                <MUI.Grid item xs={12}>
                  <MUI.Typography variant='h4'>
                    Stock Trades
                  </MUI.Typography>
                </MUI.Grid>
                <MUI.Grid item xs={12}>
                  <StockTradesTable
                    trades={stockTrades}
                  />
                </MUI.Grid>
              </MUI.Box>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Container>
      ) : null
    );
  }

  private handleStockTradeFormSubmit = (trade: StockTrade) => {
    const id = this.state.selectedPortfolio._id;
    const url = 'http://localhost:7000/api/portfolios/' + id + '/trades';
    const params = new URLSearchParams();
    Object.keys(trade).forEach((key) => {
      params.append(key, trade[key].toString());
    });
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    http.post(url, params, config)
      .then(() => {
        this.loadStockTrades()
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private loadPortfolios = () => {
    http.get<Portfolio[]>('http://localhost:7000/api/portfolios')
      .then((res) => {
        this.setState({
          portfolios: res.data,
          selectedPortfolio: res.data[0]
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private loadHoldings = () => {
    const id = this.state.selectedPortfolio._id;
    http.get<Holding[]>('http://localhost:7000/api/portfolios/' + id + '/holdings')
      .then((res) => {
        console.log('res:', res);
        // this.setState({
        //   portfolios: res.data,
        //   selectedPortfolio: res.data[0]
        // });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private loadStockTrades = () => {
    const id = this.state.selectedPortfolio._id;
    http.get<StockTrade[]>('http://localhost:7000/api/portfolios/' + id + '/trades/stock')
      .then((res) => {
        console.log('res:', res);
        this.setState({
          stockTrades: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private onSelectPortfolio = (ev: React.ChangeEvent, value: string) => {
    const portfolio = this.state.portfolios.find((p) => p._id === value);
    this.setState({
      selectedPortfolio: portfolio
    }, () => {
      // this.loadHoldings();
      this.loadStockTrades();
    });
  }
}
