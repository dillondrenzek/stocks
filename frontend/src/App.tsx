import React, { useState } from 'react';
import _ from 'lodash';
import { Button, Container, Col, Nav, Row } from './shared';

import { Portfolio } from './types';

import { PortfolioForm } from './portfolios/portfolio-form/portfolio-form';
import PortfolioTabs from './portfolios/portfolio-tabs/portfolio-tabs';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioFormValue, setPortfolioFormValue] = useState<Portfolio>(new Portfolio());
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>(null);

  return (
    <Container>

      <Row>
        <Col>
          <PortfolioForm
            onSubmit={setPortfolioFormValue}
            value={portfolioFormValue}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <PortfolioTabs 
            portfolios={portfolios} 
            selectedPortfolio={selectedPortfolio}
            onSelectPortfolio={setSelectedPortfolio}
          />
        </Col>
      </Row>

    </Container>
  );
}