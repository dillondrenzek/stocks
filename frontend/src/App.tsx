import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Container, Col, Nav, Row } from './shared';

import { PortfolioAPI } from './api/portfolio-api';

import { Portfolio } from './types';

import { Portfolio as PortfolioPage } from './components/portfolios/portfolio/portfolio';
import { PortfolioForm } from './components/portfolios/portfolio-form/portfolio-form';
import PortfolioTabs from './components/portfolios/portfolio-tabs/portfolio-tabs';

import 'bootstrap/dist/css/bootstrap.min.css';


interface Portfolios {
  [id: string]: Portfolio;
}

function arrayToPortfolios(data: Portfolio[]): Portfolios {
  let portfolios: Portfolios = {};
  data.forEach((p: Portfolio) => {
    portfolios[p._id] = p;
  });
  return portfolios;
};

function useSelectedPortfolio(initialState): [Portfolio, (p: Portfolio) => void] {
  const [portfolio, setPortfolio] = useState<Portfolio>(initialState);

  return [
    portfolio,
    (newPortfolio: Portfolio) => {
      console.log('set selected portfolio:', newPortfolio);
      if (!newPortfolio) {
        setPortfolio(newPortfolio);
      } else {
        if (!portfolio || (newPortfolio._id !== portfolio._id)) {
          // fetch portfolio then set it
          PortfolioAPI.getPortfolioById(newPortfolio._id, (fetchedPortfolio: Portfolio) => {
            console.log('fetched selected portfolio:', fetchedPortfolio);
            setPortfolio(fetchedPortfolio);
          });
        }
      }
    }
  ];
}

export default function App() {

  const [portfolios, setPortfolios] = useState<Portfolios>(null);
  const [portfolioFormValue, setPortfolioFormValue] = useState<Portfolio>(new Portfolio());
  const [selectedPortfolio, setSelectedPortfolio] = useSelectedPortfolio(null);

  // get portfolios
  useEffect(() => {
    if (!portfolios) {
      PortfolioAPI.getPortfolios((data) => {
        const _portfolios = arrayToPortfolios(data);
        const _selectedPortfolio = (selectedPortfolio) 
          ? _portfolios[selectedPortfolio._id] 
          : null;
        setPortfolios(_portfolios);
        setSelectedPortfolio(_selectedPortfolio);
      });
    }
  }, []);

  const handlePortfolioFormSubmit = (value: Portfolio) => {
    PortfolioAPI.createPortfolio(value, () => {
      PortfolioAPI.getPortfolios((data: Portfolio[]) => {
        const _portfolios = arrayToPortfolios(data);
        // set array of new portfolios
        setPortfolios(_portfolios);
        // reset form
        setPortfolioFormValue(new Portfolio());

        setSelectedPortfolio((data.length) ? data[0] : null);
      });
    });
  };

  const handlePortfolioChange = (value: Portfolio) => {
    PortfolioAPI.getPortfolioById(value._id, (data: Portfolio) => {
      const updatedPortfolios = {
        ...portfolios,
        [value._id]: data
      };
      setPortfolios(updatedPortfolios);
      setSelectedPortfolio(data);
    });
  }

  const handleSelectPortfolio = (p: Portfolio) => setSelectedPortfolio(p);

  const getTabs = portfolios && Object.values(portfolios);

  return (
    <Container fluid>

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
            portfolios={getTabs} 
            selectedPortfolio={selectedPortfolio}
            onSelectPortfolio={handleSelectPortfolio}
          />
        </Col>
      </Row>

      <Row>
        <Col>

          <PortfolioPage
            portfolio={selectedPortfolio}
            onPortfolioChange={handlePortfolioChange}
          />

        </Col>
      </Row>

    </Container>
  );
}