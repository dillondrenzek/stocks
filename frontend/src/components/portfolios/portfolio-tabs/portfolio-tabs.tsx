import React from 'react';
import _ from 'lodash';
import { Alert, Button, Form, Nav } from '../../../shared';
import { Portfolio } from '../../../types';
import { usePortfolioForm } from '../portfolio-form/portfolio-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';

interface PortfolioTabsProps {
  portfolios: Portfolio[],
  selectedPortfolio: Portfolio,
  onSelectPortfolio: (selectedPortfolio: Portfolio) => void;
}

const key = (p: Portfolio) => {
  if (!p) return null;
  return p._id || null
};

export default function PortfolioTabs({
  portfolios,
  selectedPortfolio,
  onSelectPortfolio
} : PortfolioTabsProps) {

  const handleSelectPortfolio = (id: string) => {
    // find portfolio
    const selectedPortfolio = _.find(portfolios, (p) => key(p) === id);
    // emit portfolio
    onSelectPortfolio(selectedPortfolio);
  };

  const portfoliosExist = portfolios && portfolios.length;

  const { 
    value: formValue, 
    getFieldChangeHandler,
    submitForm 
  } = usePortfolioForm(new Portfolio());

  return (
    portfoliosExist ? (
      <Nav
        variant='tabs'
        activeKey={key(selectedPortfolio)}
        onSelect={handleSelectPortfolio}
      >
        {portfolios.map((portfolio, i) => (
          <Nav.Item key={i}>
            <Nav.Link eventKey={key(portfolio)} active={selectedPortfolio && selectedPortfolio._id === portfolio._id}>{portfolio.name}</Nav.Link>
          </Nav.Item>
        ))}
        <Nav.Item>
          <Form inline onSubmit={submitForm}>
            <InputGroup>
              <Form.Control 
                placeholder='New Portfolio'
                type='text' 
                value={formValue.name} 
                onChange={getFieldChangeHandler('name')} 
              />
              <InputGroup.Append>
                <Button type='submit'>Add</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Nav.Item>
      </Nav>
    ) : (
      <Alert variant='dark'>
        No Portfolios exist
      </Alert>
    )
  );
}
