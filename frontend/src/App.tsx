import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState, } from 'react';

import { PortfolioAPI } from './api/portfolio-api';

import { AppBar, Box, Button, Container, Grid, Paper, Tab, Tabs, Toolbar, Typography } from './components/shared';

import HoldingsTable from './components/holdings-table/holdings-table';
import { PortfolioForm } from './components/portfolio-form/portfolio-form';
import TransactionsTable from './components/transactions-table/transactions-table';


import { Portfolio, Holding } from './types/portfolio';
import { Transaction, StockTransaction } from './types/transaction';

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
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    background: '#e1e8ee'
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export interface AppState {
  holdings: Holding[];
  portfolios: Portfolio[];
  stockTrades: StockTransaction[];
  stockTradeFormValue: StockTransaction;
  selectedPortfolio: Portfolio;
}

export default function App() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioFormValue, setPortfolioFormValue] = useState<Portfolio>(new Portfolio());
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>(null);
  const [selectedHolding, setSelectedHolding] = useState<Holding>(null);
  const [stockTradeFormValue, setStockTradeFormValue] = useState<StockTransaction>(new StockTransaction());

  const classes = useStyles({});

  // get portfolios
  useEffect(() => {
    if (!portfolios.length) {
      PortfolioAPI.getPortfolios((data) => {
        setPortfolios(data);
        if (data && data.length) {
          setSelectedPortfolio(data[0]);
          PortfolioAPI.getPortfolioById(data[0]._id, (p) => setSelectedPortfolio(p));
        }
      });
    }
  });

  const onSelectPortfolio = (ev: React.ChangeEvent, value: string) => {
    const portfolio = portfolios.find((p) => p._id === value);
    setSelectedHolding(null);
    PortfolioAPI.getPortfolioById(portfolio._id, (p) => setSelectedPortfolio(p));
  };

  const handleStockTradeFormSubmit = (value: StockTransaction) => {
    // PortfolioAPI.addTradeToPortfolio(value, selectedPortfolio._id, (updatedPortfolio: Portfolio) => {
    //   setSelectedPortfolio(updatedPortfolio);
    //   PortfolioAPI.getStockTradesForPortfolio(selectedPortfolio._id, setStockTrades);
    // });
  };

  const handlePortfolioFormSubmit = (value: Portfolio) => {
    PortfolioAPI.createPortfolio(value, () => {
    //   PortfolioAPI.getPortfolios((_portfolios: Portfolio[]) => {
    //     setPortfolios(_portfolios);
    //     setPortfolioFormValue(new Portfolio());
    //   });
    });
  };

  const onDeleteStockTrade = (trade: StockTransaction) => {
    // PortfolioAPI.deleteTradeFromPortfolio(trade, selectedPortfolio._id, () => {
    //   PortfolioAPI.getStockTradesForPortfolio(selectedPortfolio._id, setStockTrades);
    // });
  };

  const onDeleteSelectedPortfolio = () => {
    // PortfolioAPI.deletePortfolio(selectedPortfolio, () => {
    //   PortfolioAPI.getPortfolios((data) => {
    //     setSelectedPortfolio(data[0]);
    //     setPortfolios(data);
    //     PortfolioAPI.getStockTradesForPortfolio(data[0]._id, setStockTrades);
    //   });
    // });
  };
  
  const handleSelectHolding = (h: Holding) => {
    setSelectedHolding(h);
  };

  const handleSelectTransaction = (tx: Transaction) => {

  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <Grid container spacing={2} alignItems='center'>
                  <Grid item>
                    <PortfolioForm
                      onSubmit={handlePortfolioFormSubmit}
                      value={portfolioFormValue}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      color='secondary'
                      variant='text'
                      onClick={onDeleteSelectedPortfolio}
                    >
                      Delete Selected Portfolio
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {portfolios && portfolios.length && selectedPortfolio && (
              <Tabs value={selectedPortfolio && selectedPortfolio._id} onChange={onSelectPortfolio}>
                {portfolios.map((portfolio, i) => (
                  <Tab key={i} label={portfolio.name} value={portfolio._id} />
                ))}
              </Tabs>
            )}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12}>
                  <Typography variant='h4'>
                    New Trade
                  </Typography>
                </Grid>
                <StockTradeForm
                  onSubmit={handleStockTradeFormSubmit}
                  value={stockTradeFormValue}
                />
              </Paper>
            </Grid> */}
            {selectedPortfolio ? (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <Typography variant='h4'>
                      Holdings
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {selectedPortfolio.holdings && (
                      <HoldingsTable
                        holdings={Object.values(selectedPortfolio.holdings)}
                        onSelectHolding={handleSelectHolding}
                      />
                    )}
                  </Grid>
                </Paper>
              </Grid>
            ) : null}
            {selectedHolding ? (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <Typography variant='h4'>
                      Transactions
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {selectedPortfolio.holdings && (
                      <TransactionsTable
                        transactions={selectedHolding.transactions}
                      />
                    )}
                  </Grid>
                </Paper>
              </Grid>
            ) : null}
            {/* <Grid item xs={12}>
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
            </Grid> */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12}>
                  <Typography variant='h4'>
                    Options Trades
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' variant='subtitle1'>
                    No Options Trades table yet.
                  </Typography>
                  <StockTradesTable
                    trades={stockTrades}
                    onClickDelete={onDeleteStockTrade}
                  />
                </Grid>
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
