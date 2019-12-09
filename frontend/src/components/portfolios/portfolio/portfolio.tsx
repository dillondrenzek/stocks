import React, { useState } from 'react';
import { Portfolio as PortfolioModel, Holding } from '../../../types/portfolio';
import { StockTransaction, OptionTransaction, Transaction } from '../../../types/transaction';
import { Alert, Card, Col, Form, FormControlProps, Row, Typography } from '../../../shared';
import { PortfolioAPI } from '../../../api/portfolio-api';
import StockTransactionsTable from '../../transactions/stock-transactions-table/stock-transactions-table';
import OptionTransactionsTable from '../../transactions/option-transactions-table/option-transactions-table';
import StockTransactionForm from '../../transactions/stock-transaction-form/stock-transaction-form';
import OptionTransactionForm from '../../transactions/option-transaction-form/option-transaction-form';
import { StockOrOption } from '../../../../../lib/types';

export interface PortfolioProps {
  portfolio: PortfolioModel;
  onPortfolioChange: (portfolio: PortfolioModel) => void;
}

export function Portfolio(props: PortfolioProps) {

  const { portfolio } = props;
  const holdings = portfolio ? Object.values(portfolio.holdings) : [];

  const [transactionFormType, setTransactionFormType] = useState<StockOrOption>('stock');
  const [stockTransactionFormValue, setStockTransactionFormValue] = useState(new StockTransaction());
  const [optionTransactionFormValue, setOptionTransactionFormValue] = useState(new OptionTransaction());

  // const handleTransactionFormTypeChange = (ev: React.FormEvent) => {
  const handleTransactionFormTypeChange = (ev: React.FormEvent<FormControlProps>) => {
    const value = ev.currentTarget.value as StockOrOption;
    setTransactionFormType(value);
  }

  const handleTransactionFormSubmit = (value: Transaction) => {
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
                    {holding.stockTransactions.length ? (
                      <Card>
                        <Card.Header>
                          <Typography>{holding.symbol} (Stock)</Typography>
                        </Card.Header>
                        <Card.Body>
                          <Alert variant='secondary'>
                            <span>
                              <div>No. of Shares</div>
                              <div>{StockTransaction.totalQuantity(holding.stockTransactions)}</div>
                            </span>
                            <span>
                              <div>Avg. Cost</div>
                              <div>{StockTransaction.averageCost(holding.stockTransactions)}</div>
                            </span>
                          </Alert>
                          <StockTransactionsTable
                            transactions={holding.stockTransactions}
                            onDeleteTransaction={handleDeleteTransaction}
                          />
                        </Card.Body>
                      </Card>
                    ) : null}
                    {(holding.optionTransactions.length) ? (
                      <Card>
                        <Card.Header>
                          <Typography>{holding.symbol} (Option)</Typography>
                        </Card.Header>
                        <Card.Body>
                          <OptionTransactionsTable
                            transactions={holding.optionTransactions}
                            onDeleteTransaction={handleDeleteTransaction}
                          />
                        </Card.Body>
                      </Card>
                    ) : null}
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
                  <Form.Control
                    as={'select'}
                    onChange={handleTransactionFormTypeChange}
                    value={transactionFormType}
                  >
                    <option value='stock'>New Stock Transaction</option>
                    <option value='option'>New Option Transaction</option>
                  </Form.Control>
                </Typography>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {(transactionFormType === 'stock') && (
              <StockTransactionForm
                onSubmit={handleTransactionFormSubmit}
                value={stockTransactionFormValue}
              />
            )}
            {(transactionFormType === 'option') && (
              <OptionTransactionForm
                onSubmit={handleTransactionFormSubmit}
                value={optionTransactionFormValue}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}