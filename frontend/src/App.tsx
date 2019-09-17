import React, { useState } from 'react';
import _ from 'lodash';
import { Button, Container, Col, Nav, Row } from './shared';

import { Portfolio } from './types';

import 'bootstrap/dist/css/bootstrap.min.css';

interface PortfolioTabsProps {
  portfolios: Portfolio[],
  selectedPortfolio: Portfolio,
  onSelectPortfolio: (selectedPortfolio: Portfolio) => void; 
}

const key = (p: Portfolio) => {
  if (!p) return null;
  return p._id || null
};

function PortfolioTabs({ 
  portfolios, 
  selectedPortfolio, 
  onSelectPortfolio 
}: PortfolioTabsProps) {



  const handleSelectPortfolio = (id: string) => {

    // find portfolio
    const selectedPortfolio = _.find(portfolios, (p) => key(p) === id);

    // emit portfolio
    onSelectPortfolio(selectedPortfolio);

  }

  const tabsExist = (portfolios && portfolios.length && selectedPortfolio);

  return (
    <>
      {/* { tabsExist ? ( */}
        <Nav 
          activeKey={key(selectedPortfolio)} 
          onSelect={handleSelectPortfolio}
        >
          {portfolios.map((portfolio, i) => (
            <Nav.Item>
              <Nav.Link eventKey={key(portfolio)}>{portfolio.name}</Nav.Link>
            </Nav.Item>
          ))}
          <Nav.Item>
            <Button>
              Add
            </Button>
          </Nav.Item>
        </Nav>
    </>
  );
}

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