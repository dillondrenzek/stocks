import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState, } from 'react';

import http from './lib/http';

import { AppBar, Box, Container, Grid, Paper, Tab, Tabs, Toolbar, Typography } from './components/shared';

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
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const PortfolioAPI = {
  addTradeToPortfolio: (trade: StockTrade, portfolioId: string, cb: () => void) => {
    const url = 'http://localhost:7000/api/portfolios/' + portfolioId + '/trades';
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
      .then(cb)
      .catch((err) => {
        console.error(err);
      });
  },
  getPortfolios: (cb: (portfolios: Portfolio[]) => void) => {
    http.get<Portfolio[]>('http://localhost:7000/api/portfolios')
      .then((res) => cb(res.data))
      .catch((err) => {
        console.error(err);
      });
  },
  getStockTradesForPortfolio: (id: string, cb: (trades: StockTrade[]) => void) => {
    http.get<StockTrade[]>('http://localhost:7000/api/portfolios/' + id + '/trades/stock')
      .then((res) => cb(res.data))
      .catch((err) => {
        console.error(err);
      });
  },
  deleteStockTradeFromPortfolio: (stockTradeId: string, portfolioId: string, cb: () => void) => {
    http.post('http://localhost:7000/api/portfolios/' + portfolioId + '/trades/' + stockTradeId + '/delete')
      .then((res) => cb())
      .catch((err) => {
        console.error(err);
      });
  }
};

export interface AppState {
  holdings: Holding[];
  portfolios: Portfolio[];
  stockTrades: StockTrade[];
  stockTradeFormValue: StockTrade;
  selectedPortfolio: Portfolio;
}

export default function App() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>(null);
  const [stockTradeFormValue, setStockTradeFormValue] = useState<StockTrade>(new StockTrade());
  const [stockTrades, setStockTrades] = useState([]);

  const classes = useStyles({});

  // get portfolios
  useEffect(() => {
    if (!portfolios.length) {
      PortfolioAPI.getPortfolios((data) => {
        setPortfolios(data);
        setSelectedPortfolio(data[0]);
        PortfolioAPI.getStockTradesForPortfolio(data[0]._id, setStockTrades);
      });
    }
  });

  const onSelectPortfolio = (ev: React.ChangeEvent, value: string) => {
    const portfolio = portfolios.find((p) => p._id === value);
    setSelectedPortfolio(portfolio);
    PortfolioAPI.getStockTradesForPortfolio(portfolio._id, setStockTrades);
  };

  const handleStockTradeFormSubmit = (value: StockTrade) => {
    PortfolioAPI.addTradeToPortfolio(value, selectedPortfolio._id, () => {
      PortfolioAPI.getStockTradesForPortfolio(selectedPortfolio._id, setStockTrades);
    });
  };

  const onDeleteStockTrade = (trade: StockTrade) => {
    PortfolioAPI.deleteStockTradeFromPortfolio(trade._id, selectedPortfolio._id, () => {
      PortfolioAPI.getStockTradesForPortfolio(selectedPortfolio._id, setStockTrades);
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container>
          <Grid container>
            <Tabs value={selectedPortfolio && selectedPortfolio._id} onChange={onSelectPortfolio}>
              {portfolios.map((portfolio, i) => (
                <Tab key={i} label={portfolio.name} value={portfolio._id} />
              ))}
            </Tabs>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <StockTradeForm
                  onSubmit={handleStockTradeFormSubmit}
                  value={stockTradeFormValue}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12}>
                  <Typography variant='h4'>
                    Stock Trades
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <StockTradesTable
                    trades={stockTrades}
                    onClickDelete={onDeleteStockTrade}
                  />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
