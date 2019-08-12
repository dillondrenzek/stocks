import React, { useState, useEffect } from 'react';
import { StockTrade } from '../../types/trade';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '../shared';
import { PortfolioAPI } from '../../api/portfolio-api';

export interface StockTradesTableProps {
  trades?: StockTrade[];
}

type TableHeaders<T> = Array<{
  key: keyof Partial<T>,
  label: string;
  align?: 'right' | 'left' | 'center';
}>;

export function StockTradesTable(props: StockTradesTableProps) {

  const tableHeaders: TableHeaders<StockTrade> = [
    { key: 'side', label: 'Side' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'quantity', label: 'Quantity', align: 'right' },
    { key: 'price', label: 'Price', align: 'right' },
  ];

  const { trades } = props;

  const handleStockTradeDelete = (id: string) => (ev: React.MouseEvent) => {
    
  };

  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          {tableHeaders.map(({ label, align }, i) => (
            <TableCell key={i} align={align}>{label}</TableCell>
          ))}
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trades.map((trade, j) => (
          <TableRow key={j}>
            {tableHeaders.map(({ key, align }) => (
              <TableCell key={key} align={align}>{trade[key]}</TableCell>
            ))}
            <TableCell align='right'>
              <Button color='secondary' onClick={handleStockTradeDelete(trade._id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  // }
}
