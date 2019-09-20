import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Container, Col, Nav, Row } from './shared';

import { PortfolioAPI } from './api/portfolio-api';

import { Portfolio } from './types';

import { Portfolio as PortfolioPage } from './components/portfolios/portfolio/portfolio';
import { PortfolioForm } from './components/portfolios/portfolio-form/portfolio-form';
import PortfolioTabs from './components/portfolios/portfolio-tabs/portfolio-tabs';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioFormValue, setPortfolioFormValue] = useState<Portfolio>(new Portfolio());
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>(null);

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

  const handlePortfolioFormSubmit = (value: Portfolio) => {
    PortfolioAPI.createPortfolio(value, () => {
      PortfolioAPI.getPortfolios((p: Portfolio[]) => {
        // set array of new portfolios
        setPortfolios(p);
        // reset form
        setPortfolioFormValue(new Portfolio());
      });
    });
  };

  return (
    <Container>

      <Row>
        <Col>
          <PortfolioForm
            onSubmit={handlePortfolioFormSubmit}
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

      <Row>
        <Col>

          <PortfolioPage
            portfolio={selectedPortfolio}
          />

        </Col>
      </Row>

    </Container>
  );
}