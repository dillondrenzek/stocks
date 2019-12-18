import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PortfolioSummaryTable } from './portfolio-summary-table';
import { PortfolioSummaryApi } from '../../api/portfolio-summary-api';

function usePortfolioSummaryItems() {
  const [portfolioSummaryItems, setPortfolioSummaryItems] = useState([]);

  useEffect(() => {
    PortfolioSummaryApi.getPortfolioSummary((items) => {
      setPortfolioSummaryItems(items);
    });
  }, []);

  return {
    portfolioSummaryItems
  }
}

export function PortfolioSummaryPage(props) {
  const { portfolioSummaryItems } = usePortfolioSummaryItems();

  return (
    <Container fluid>
      <Row>
        <Col>

          <h3>Portfolio Summary</h3>
          <PortfolioSummaryTable
            items={portfolioSummaryItems}
          />

        </Col>
      </Row>
    </Container>
  );
}
