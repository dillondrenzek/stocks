import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import http from './lib/http';

import { AppBar, Box, Container, Grid, Tab, Tabs, Toolbar, Typography } from './components/shared';

import { HoldingsTable } from './components/holdings-table/holdings-table';
import { PortfoliosTable } from './components/portfolios-table/portfolios-table';
import { StockTradeForm } from './components/stock-trade-form/stock-trade-form';
import { StockTradesTable } from './components/trades-table/stock-trades-table';

import { Holding } from './types/holding';
import { Portfolio } from './types/portfolio';
import { StockTrade } from './types/trade';

import './App.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

export default function Layout({ portfolios, selectedPortfolio, stockTradeFormValue, stockTrades }: AppState) {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Container>
        <Grid container spacing={3}>
          <Tabs value={selectedPortfolio._id} onChange={this.onSelectPortfolio}>
            {portfolios.map((portfolio, i) => (
              <Tab key={i} label={portfolio.name} value={portfolio._id} />
            ))}
          </Tabs>
          <Grid item xs={12}>
            <StockTradeForm
              onSubmit={this.handleStockTradeFormSubmit}
              value={stockTradeFormValue}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Grid item xs={12}>
                <Typography variant='h4'>
                  Stock Trades
                  </Typography>
              </Grid>
              <Grid item xs={12}>
                <StockTradesTable
                  trades={stockTrades}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

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
      selectedPortfolio: null,
      stockTradeFormValue: new StockTrade(),
      stockTrades: [],
    };
  }

  public componentDidMount() {
    this.loadPortfolios();
  }

  public render() {
    const {
      // holdings,
      portfolios,
      // selectedPortfolio,
      // stockTrades,
      // stockTradeFormValue
    } = this.state;
    return (
      portfolios.length ? (
        <Layout
          {...this.state}
        />
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
        this.loadStockTrades();
        this.resetStockTradeFormValue();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private resetStockTradeFormValue = () => {
    this.setState({
      stockTradeFormValue: new StockTrade()
    });
  }

  private loadPortfolios = () => {
    http.get<Portfolio[]>('http://localhost:7000/api/portfolios')
      .then((res) => {
        this.setState({
          portfolios: res.data,
          selectedPortfolio: res.data[0]
        });
        this.loadStockTrades();
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
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private loadStockTrades = () => {
    const id = this.state.selectedPortfolio._id;
    http.get<StockTrade[]>('http://localhost:7000/api/portfolios/' + id + '/trades/stock')
      .then((res) => {
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
      this.loadStockTrades();
    });
  }
}
