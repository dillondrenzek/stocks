import React, { useState, useEffect } from 'react';
import { PortfolioAPI } from '../../api/portfolio-api';
import { StockTransaction } from '../../types/transaction';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '../../shared';

export interface StockTradesTableProps {
  onClickDelete?: (trade: StockTransaction) => void;
  trades?: StockTransaction[];
}

type TableHeaders<T> = Array<{
  key: keyof Partial<T>,
  label: string;
  align?: 'right' | 'left' | 'center';
}>;

export function StockTradesTable(props: StockTradesTableProps) {

  const tableHeaders: TableHeaders<StockTransaction> = [
    { key: 'side', label: 'Side' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'quantity', label: 'Quantity', align: 'right' },
    { key: 'price', label: 'Price', align: 'right' },
  ];

  const { onClickDelete, trades } = props;

  const handleStockTradeDelete = (trade: StockTransaction) => (ev: React.MouseEvent) => {
    if (typeof onClickDelete === 'function') {
      onClickDelete(trade);
    }
  };

  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          {tableHeaders.map(({ label, align }, i) => (
            <TableCell key={i} align={align}>{label}</TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {trades.map((trade, j) => (
          <TableRow key={j}>
            {tableHeaders.map(({ key, align }) => (
              <TableCell key={key} align={align}>{trade[key]}</TableCell>
            ))}
            <TableCell align='right'>
              <Button onClick={handleStockTradeDelete(trade)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
