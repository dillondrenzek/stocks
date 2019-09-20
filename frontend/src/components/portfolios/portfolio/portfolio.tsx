import React, { useEffect, useState } from 'react';
import { Portfolio as PortfolioModel, Holding } from '../../../types/portfolio';
import { Accordion, Button, Card, Col, Form, FormControl, Row, Typography } from '../../../shared';

import HoldingsTable from '../../holdings-table/holdings-table';
import TransactionsTable from '../../transactions-table/transactions-table';
import TransactionForm from '../../transaction-form/transaction-form';
import { Alert } from 'react-bootstrap';

export interface PortfolioProps {
  portfolio?: PortfolioModel;
}

export function Portfolio (props: PortfolioProps) {

  const { portfolio } = props;
  const holdings = portfolio ? Object.values(portfolio.holdings) : [];

  // const [selectedHolding, setSelectedHolding] = useState<Holding>(null);

  // const handleSelectHolding = (h: Holding) => {
  //   setSelectedHolding(h);
  // };

  const [stockTransactionFormValue, setStockTransactionFormValue] = useState();

  const handleTransactionFormSubmit = () => {

  };

  return (
    <Row noGutters>
      <Col xs={9}>
        {portfolio && holdings.length ? (
          <Accordion>
            {holdings.map((h: Holding, i: number) => (
              <Card key={i}>
                <Accordion.Toggle as={Card.Header} variant='link' eventKey={i.toString()}>
                  {h.symbol}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i.toString()}>
                  <Card.Body>
                    <TransactionsTable
                      transactions={h.transactions}
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
      <Col xs={3}>
        <Typography variant='h6'>
          New Transaction
        </Typography>
        <Card>
          <TransactionForm 
            onSubmit={handleTransactionFormSubmit}
            value={stockTransactionFormValue}
          />
        </Card>
      </Col>
    </Row>
  );
}