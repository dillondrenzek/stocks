import React from 'react';
import styles from './quote-table.module.scss';

type TableColumnOptions = {
    format?: 'number' | 'date' | 'percent';
};

// table
// thead
// tr
// each col in tableColumns
//     - var className = col.key + ' ' + col.format
// th(class= className) = col.label
// tbody
// each quote, i in quotes
// tr
// each col in tableColumns
//     - var className = col.key + ' ' + col.format
//         - var value = quote[col.key]
// td(class= className) = col.formatFn(value)

interface TableColumn {
    label: string;
    key: keyof Quote;
    options?: TableColumnOptions;
}

function col(label: string, key: keyof Quote, options?: TableColumnOptions) {
    return {
        label,
        key,
        options
    }
}

interface TableHeaderCellProps {
    column?: TableColumn;
}

const TableHeaderCell = (props: TableHeaderCellProps) => {
    const { 
        column
    } = props;

    let className = '';

    if (column && column.options) {
        const { options } = column;
        if (options.format) {
            className += column.options.format;
        }
    }

    return column ? (
        <th className={className}>
            {column.label}
        </th>
    ) : null;
};

const TableCell = (props: TableHeaderCellProps) => {
    const { 
        column
    } = props;

    let className = '';

    if (column && column.options) {
        const { options } = column;
        if (options.format) {
            className += column.options.format;
        }
    }

    return column ? (
        <th className={className}>
            {column.label}
        </th>
    ) : null;
};

type Quote = {
    symbol: string;
    exchange: string;
    name: string;
    dayCode: string;
    serverTimestamp: string; // datetime
    mode: string;
    lastPrice: number;
    tradeTimestamp: string; // datetime
    netChange: number;
    percentChange: number;
    unitCode: string;
    open: number;
    high: number;
    low: number;
    close: number;
    flag: string;
    volume: number;
    fiftyTwoWkHigh: number;
    fiftyTwoWkHighDate: string; // date
    fiftyTwoWkLow: number;
    fiftyTwoWkLowDate: string; // date (YYYY-MM-DD)
};

export interface QuoteTableProps {
    quotes?: Quote[];
}

export class QuoteTable extends React.Component<QuoteTableProps> {

    private tableHeaders = [
        col('Name', 'name'),
        col('Symbol', 'symbol'),
        col('Price', 'lastPrice', { format: 'number' }),
        col('Chg', 'netChange', { format: 'number' }),
        col('Chg %', 'percentChange', { format: 'percent' }),
        col('Open', 'open', { format: 'number' }),
        col('High', 'high', { format: 'number' }),
        col('Low', 'low', { format: 'number' }),
        col('Close', 'close', { format: 'number' }),
        col('52-wk Hi', 'fiftyTwoWkHigh', { format: 'number' }),
        col('52-wk Hi Date', 'fiftyTwoWkHighDate', { format: 'date' }),
        col('52-wk Lo', 'fiftyTwoWkLow', { format: 'number' }),
        col('52-wk Lo Date', 'fiftyTwoWkLowDate', { format: 'date' })
    ]

    public render() {
        const {
            quotes
        } = this.props;
        return (
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        {this.tableHeaders.map((h) => <TableHeaderCell column={h} />)}
                    </tr>
                </thead>
                {quotes && quotes.length && (
                    <tbody>
                        {quotes.map((quote) => (
                            <tr>
                                {this.tableHeaders.map((headers) => (
                                    <td className={`td ${headers.key} ${headers.options ? headers.options.format : ''}`}>{quote[headers.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        );
    }
}