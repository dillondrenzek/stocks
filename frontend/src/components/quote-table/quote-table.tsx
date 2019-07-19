import React from "react";
import styles from "./quote-table.module.scss";

interface TableColumnOptions {
    format?: "number" | "date" | "percent";
}

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

const formatMap = {
    number: (val: any) => {
        if (typeof val === "number") {
            val = val.toString();
            const decimals = val.split(".");

            if (decimals.length === 1) {
                decimals.push("00");
            } else if (decimals.length === 2) {
                if (decimals[1].length === 1) {
                    decimals[1] += "0";
                } else if (decimals[1].length >= 3) {
                    decimals[1] = decimals[1].substr(0, 2);
                }
            }
            return decimals.join(".");
        }
        return val;
    },
    percent: (val: any) => {
        if (typeof val === "number") {
            val = val.toString();
            const decimals = val.split(".");
            if (decimals.length === 1) {
                decimals.push("00");
            } else if (decimals.length === 2) {
                if (decimals[1].length === 1) { decimals[1] += "0"; }
            }
            return decimals.join(".") + "%";
        }
        return val + "%";
    }
};

function col(label: string, key: keyof Quote, options?: TableColumnOptions) {
    return {
        label,
        key,
        options
    };
}

interface TableHeaderCellProps {
    column?: TableColumn;
}

const TableHeaderCell = (props: TableHeaderCellProps) => {
    const {
        column
    } = props;

    let className = "";

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

    let className = "";
    let formatter = (val: any) => val;

    if (column && column.options) {
        const { options } = column;
        if (options.format) {
            className += column.options.format;

            // format
            if (formatMap[options.format]) {
                formatter = formatMap[options.format];
            }
        }
    }

    return column ? (
        <th className={className}>
            {formatter(column.label)}
        </th>
    ) : null;
};

interface Quote {
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
}

export interface QuoteTableProps {
    quotes?: Quote[];
}

export class QuoteTable extends React.Component<QuoteTableProps> {

    private tableHeaders = [
        col("Name", "name"),
        col("Symbol", "symbol"),
        col("Price", "lastPrice", { format: "number" }),
        col("Chg", "netChange", { format: "number" }),
        col("Chg %", "percentChange", { format: "percent" }),
        col("Open", "open", { format: "number" }),
        col("High", "high", { format: "number" }),
        col("Low", "low", { format: "number" }),
        col("Close", "close", { format: "number" }),
        col("52-wk Hi", "fiftyTwoWkHigh", { format: "number" }),
        col("52-wk Hi Date", "fiftyTwoWkHighDate", { format: "date" }),
        col("52-wk Lo", "fiftyTwoWkLow", { format: "number" }),
        col("52-wk Lo Date", "fiftyTwoWkLowDate", { format: "date" })
    ];

    public render() {
        const {
            quotes
        } = this.props;
        return (
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        {this.tableHeaders.map((h, i) => <TableHeaderCell key={i} column={h} />)}
                    </tr>
                </thead>
                {quotes && quotes.length && (
                    <tbody>
                        {quotes.map((quote, i) => (
                            <tr key={i}>
                                {this.tableHeaders.map((headers, j) => (
                                    <td className={`td ${headers.key} ${headers.options ? headers.options.format : ""}`} key={j}>{quote[headers.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        );
    }
}
