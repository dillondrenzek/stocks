import React from 'react';
import { PortfolioSummaryItem } from '../../types/portfolio-summary';
import { Table } from '../shared/table';


// function 

export interface PortfolioSummaryTableProps {
  items: PortfolioSummaryItem[]
}

export function PortfolioSummaryTable(props: PortfolioSummaryTableProps) {
  return (
    <>
      {props.items ? (
        <Table<PortfolioSummaryItem>
          columns={[
            { key: 'accountType', label: 'Acct Type' },
            { key: 'annualIncome', label: 'Annual Income' },
            { key: 'changePercent', label: 'Change %' },
            { key: 'equitiesOptions', label: 'Equities/Options' },
            { key: 'mktValue', label: 'Market Value' },
            { key: 'mktValueLastPeriod', label: 'Market Value Last Period' },
            { key: 'portfolioPercent', label: 'Portfolio %' },
            { key: 'price', label: 'Price' },
            { key: 'qty', label: 'Qty' },
            { key: 'symbol', label: 'symbol' },
            { key: 'yieldPercent', label: 'Yield %' },
          ]}
          data={props.items}
        />
      ) : null}
    </>
  );
}