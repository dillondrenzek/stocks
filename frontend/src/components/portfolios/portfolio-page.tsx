import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PortfolioAPI } from '../../api/portfolio-api';
import { Portfolio } from '../../types';
import { Portfolio as PortfolioComponent } from '../../components/portfolios/portfolio/portfolio';
import { PortfolioForm } from './portfolio-form/portfolio-form';
import PortfolioTabs from './portfolio-tabs/portfolio-tabs';

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

      if (!newPortfolio) {
        setPortfolio(newPortfolio);
      } else {
        // fetch portfolio then set it
        PortfolioAPI.getPortfolioById(newPortfolio._id, (fetchedPortfolio: Portfolio) => {
          console.log('fetched selected portfolio:', fetchedPortfolio);
          setPortfolio(fetchedPortfolio);
        });
      }
    }
  ];
}

export default function PortfolioPage() {

  const [portfolios, setPortfolios] = useState<Portfolios>(null);
  const [portfolioFormValue, setPortfolioFormValue] = useState<Portfolio>(new Portfolio());
  const [selectedPortfolio, setSelectedPortfolio] = useSelectedPortfolio(null);




  // get portfolios
  useEffect(() => {
    if (!portfolios) {
      PortfolioAPI.getPortfolios((data) => {

        // set portfolios
        const _portfolios = arrayToPortfolios(data);
        setPortfolios(_portfolios);

        // select an initial portfolio
        updateSelectedPortfolio(_portfolios);
      });
    }
  }, []);

  const updateSelectedPortfolio = (_portfolios: Portfolios) => {
    const _ids = Object.keys(_portfolios);
    let _selectPortfolio: Portfolio;

    if (selectedPortfolio) {
      // update currently selected portfolio
      _selectPortfolio = _portfolios[selectedPortfolio._id];
    } else if (_ids.length) {
      // set selected to first portfolio in array
      _selectPortfolio = _portfolios[_ids[0]];
    } else {
      // no portfolios, don't select one
      _selectPortfolio = null;
    }

    setSelectedPortfolio(_selectPortfolio);
  };

  const handlePortfolioChange = (value: Portfolio) => {
    console.log('handle portfolio change', value);
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

  const handlePortfolioFormSubmit = (value: Portfolio) => {
    PortfolioAPI.createPortfolio(value, () => {
      PortfolioAPI.getPortfolios((data: Portfolio[]) => {
        const _portfolios = arrayToPortfolios(data);
        // set array of new portfolios
        setPortfolios(_portfolios);
        // reset form
        setPortfolioFormValue(new Portfolio());
        // update selected portfolio
        updateSelectedPortfolio(_portfolios);
      });
    });
  };

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
          <PortfolioComponent
            portfolio={selectedPortfolio}
            onPortfolioChange={handlePortfolioChange}
          />
        </Col>
      </Row>
    </Container>
  )
}