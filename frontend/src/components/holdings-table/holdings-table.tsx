import React from 'react';
import * as MUI from '@material-ui/core';
import { Holding } from './holding';


export interface HoldingsTableProps {
    holdings?: Holding[];
}

type TableHeaders<T> = {
    [key in keyof T]: {
        key,
        label: string;
    }
}

export class HoldingsTable extends React.Component<HoldingsTableProps> {

    private tableHeaders: TableHeaders<Holding> = {
        symbol: { key: 'symbol', label: 'Symbol' },
        quantity: { key: 'quantity', label: 'Quantity' },
        avgCost: { key: 'avgCost', label: 'Avg. Cost' },
    };

    private get tableRows() {
        return this.props.holdings ? this.props.holdings.map(
            (h) => {
                return {

                }
            }
        ) : [];
    }

    public render() {
        const {
            holdings
        } = this.props;
        return (
            <MUI.Table size='small'>
                <MUI.TableHead>
                    <MUI.TableRow>
                        {Object.keys(this.tableHeaders).map((key, i) => <MUI.TableCell key={i}>{this.tableHeaders[key].label}</MUI.TableCell>)}
                    </MUI.TableRow>
                </MUI.TableHead>
                <MUI.TableBody>
                    {holdings.map((holding, j) => (
                        <MUI.TableRow key={j}>
                            {Object.keys(this.tableHeaders).map((key, i) => <MUI.TableCell key={i}>{holding[key]}</MUI.TableCell>)}
                        </MUI.TableRow>
                    ))}
                </MUI.TableBody>
            </MUI.Table>
        );
    }
}