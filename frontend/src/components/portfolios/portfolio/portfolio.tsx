import React, { useEffect, useState } from 'react';
import { Portfolio as PortfolioModel, Holding } from '../../../types/portfolio';
import { StockTransaction } from '../../../types/transaction';
import { Accordion, Button, Card, Col, Form, FormControl, Row, Typography } from '../../../shared';

import { PortfolioAPI } from '../../../api/portfolio-api';

import HoldingsTable from '../../holdings-table/holdings-table';
import TransactionsTable from '../../transactions-table/transactions-table';
import StockTransactionForm from '../../transactions/stock-transaction-form/stock-transaction-form';
import { Alert } from 'react-bootstrap';

export interface PortfolioProps {
  portfolio: PortfolioModel;
  onPortfolioChange: (portfolio: PortfolioModel) => void;
}

export function Portfolio (props: PortfolioProps) {

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
        {portfolio && holdings.length ? (
          <Accordion>
            {holdings.map((h: Holding, i: number) => (
              <Card key={i}>
                <Accordion.Toggle as={Card.Header} variant='link' eventKey={i.toString()} style={{cursor: 'pointer'}}>
                  {h.symbol}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i.toString()}>
                  <Card.Body>
                    <TransactionsTable
                      transactions={h.transactions}
                      onDeleteTransaction={handleDeleteTransaction}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        ) : (
          <Alert>
            No Holdings
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