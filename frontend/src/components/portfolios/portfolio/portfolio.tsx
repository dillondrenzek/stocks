import React, { useState } from 'react';
import { Portfolio as PortfolioModel, Holding } from '../../../types/portfolio';
import { StockTransaction } from '../../../types/transaction';
import { Card, Col, Row, Typography } from '../../../shared';
import { PortfolioAPI } from '../../../api/portfolio-api';
import TransactionsTable from '../../transactions/transactions-table/transactions-table';
import StockTransactionForm from '../../transactions/stock-transaction-form/stock-transaction-form';
import { Alert } from 'react-bootstrap';

export interface PortfolioProps {
  portfolio: PortfolioModel;
  onPortfolioChange: (portfolio: PortfolioModel) => void;
}

export function Portfolio(props: PortfolioProps) {

  const { portfolio } = props;
  const holdings = portfolio ? Object.values(portfolio.holdings) : [];

  const [stockTransactionFormValue, setStockTransactionFormValue] = useState(new StockTransaction());

  const handleTransactionFormSubmit = (value: StockTransaction) => {
    console.log('submitted:', value)

    PortfolioAPI.addTradeToPortfolio(value, portfolio._id, (p: PortfolioModel) => {
      console.log('added trade', value, 'to portfolio', p);
      props.onPortfolioChange(p);
    });
  };

  const handleDeleteTransaction = (txId: string) => {
    PortfolioAPI.removeTradeFromPortfolio(txId, portfolio._id, (p: PortfolioModel) => {
      console.log('removed tx', txId, 'from portfolio', p);
      props.onPortfolioChange(p);
    });
  }

  return (
    <Row>
      <Col xs={8}>
        {portfolio ? (
          <>
            <Row>
              <Col>
                <Typography variant='h4'>
                  {`${portfolio.name} - Portfolio Holdings`}
                </Typography>
              </Col>
            </Row>
            <Row>
              {holdings.length ? (<>
                {holdings.map((holding: Holding, i: number) => (
                  <Col key={holding.symbol}>
                    <Card>
                      <Card.Header>
                        <Typography>{holding.symbol} (Stock)</Typography>
                      </Card.Header>
                      <Card.Body>
                        <TransactionsTable
                          transactions={holding.stockTransactions}
                          onDeleteTransaction={handleDeleteTransaction}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </>) : (
                <Col>
                  <Alert variant='light'>
                    No holdings
                  </Alert>
                </Col>
              )}
            </Row>
          </>
        ) : (
            <Alert variant='dark'>
              No portfolio selected
          </Alert>
          )}
      </Col>
      <Col xs={4}>
        <Card>
          <Card.Header>
            <Row>
              <Col>
                <Typography variant='h6'>
                  New Transaction
                </Typography>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <StockTransactionForm
              onSubmit={handleTransactionFormSubmit}
              value={stockTransactionFormValue}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}