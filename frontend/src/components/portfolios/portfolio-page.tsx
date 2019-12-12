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

function useSelectedPortfolio(initialState: Portfolio) {
  const [portfolio, setPortfolio] = useState<Portfolio>(initialState);

  const fetchSelectedPortfolio = () => {
    // fetch portfolio then set it
    PortfolioAPI.getPortfolioById(portfolio._id, (fetchedPortfolio: Portfolio) => {
      console.log('Fetched currently selected portfolio:\n', fetchedPortfolio);
      setPortfolio(fetchedPortfolio);
    });
  };
  
  useEffect(() => {
    if (portfolio) {
      console.log('Fetching portfolio:', portfolio.name);
      fetchSelectedPortfolio();
    } else {
      console.log('Skipped fetching selected portfolio: No current portfolio is selected.');
    }
  }, [portfolio ? portfolio._id : '']);

  return {
    selectedPortfolio: portfolio,
    selectPortfolio: setPortfolio,
    refreshSelectedPortfolio: fetchSelectedPortfolio
  };
}

function usePortfolios(initialState: Portfolios) {
  const [portfolios, setPortfolios] = useState<Portfolios>(null);

  
  const fetchPortfolios = () => {
    console.log('Refreshing Portfolios...');
    PortfolioAPI.getPortfolios((data) => {
      
      // set portfolios
      const _portfolios = arrayToPortfolios(data);
      setPortfolios(_portfolios);
      
      console.log('Successfully refreshed portfolios.');
    });
  }
  
  // get portfolios
  useEffect(() => {
    fetchPortfolios();
  }, []);

  return {
    portfolios,
    refreshPortfolios: fetchPortfolios
  };
}

export default function PortfolioPage() {

  const {
    portfolios,
    refreshPortfolios
  } = usePortfolios(null);

  const {
    selectedPortfolio,
    selectPortfolio
  } = useSelectedPortfolio(null);

  const updateSelectedPortfolio = (_portfolios: Portfolios) => {
    if (!_portfolios) {
      return;
    }
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

    selectPortfolio(_selectPortfolio);
  };

  const handlePortfolioChange = (value: Portfolio) => {
    console.log('[UNIMPLEMENTED] handle portfolio change', value);
    // PortfolioAPI.getPortfolioById(value._id, (data: Portfolio) => {
    //   const updatedPortfolios = {
    //     ...portfolios,
    //     [value._id]: data
    //   };
    //   setPortfolios(updatedPortfolios);
    //   selectPortfolio(data);
    // });
  }

  const handleSelectPortfolio = (p: Portfolio) => selectPortfolio(p);

  const getTabs = portfolios && Object.values(portfolios);

  useEffect(() => {
    if (portfolios) {
      updateSelectedPortfolio(portfolios);
    }
  }, [portfolios]);

  return (
    <Container fluid>
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