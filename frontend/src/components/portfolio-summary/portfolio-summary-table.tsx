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
            { key: 'equitiesOptions', label: 'Equities/Options' },
            { key: 'symbol', label: 'symbol' },
            { key: 'price', label: 'Price' },
            { key: 'qty', label: 'Qty' },
            { key: 'portfolioPercent', label: '% of Portfolio' },
            { key: 'annualIncome', label: 'Annual Income' },
            { key: 'changePercent', label: 'Change %' },
            { key: 'mktValue', label: 'Market Value' },
            { key: 'mktValueLastPeriod', label: 'Market Value Last Period' },
            { key: 'yieldPercent', label: 'Yield %' },
            // { key: 'accountType', label: 'Acct Type' },
          ]}
          data={props.items}
        />
      ) : null}
    </>
  );
}