import React, { useState } from 'react';
import _ from 'lodash';
import { Button, Container, Col, Nav, Row } from './shared';

import { Portfolio } from './types';

import PortfolioTabs from './portfolios/portfolio-tabs/portfolio-tabs';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>(null);

  return (
    <Container>
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