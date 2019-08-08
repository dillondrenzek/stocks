import { spacing } from '@material-ui/system';
import React from 'react';
import { StockTrade } from '../../types/trade';
import { Button, Grid, TextField } from '../shared';

const theme = {
  spacing: 8
};

export interface StockTradeFormProps {
  onSubmit: (value: StockTrade) => void;
  value: StockTrade;
}

interface StockTradeFormState {
  value: StockTrade;
}

export class StockTradeForm extends React.Component<StockTradeFormProps, StockTradeFormState> {

  constructor(props) {
    super(props);

    this.state = {
      value: new StockTrade({ side: 'buy' })
    };
  }

  public render() {
    const {value} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container direction={'row'} spacing={2}>
          <Grid item>
            <TextField
              label={'Symbol'}
              name='symbol'
              onChange={this.onFieldChange('symbol')}
              value={value.symbol}
            />
          </Grid>
          <Grid item>
            <TextField
              label={'Quantity'}
              name='quantity'
              onChange={this.onFieldChange('quantity')}
              value={value.quantity}
            />
          </Grid>
          <Grid item>
            <TextField
              label={'Price'}
              name='price'
              onChange={this.onFieldChange('price')}
              value={value.price}
            />
          </Grid>
          <Grid item>
            <TextField
              label={'Side'}
              name='side'
              onChange={this.onFieldChange('side')}
              value={value.side}
            />
          </Grid>
          <Grid item>
            <Button
              type='submit'
              variant='contained'
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  private onFieldChange = (fieldName: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;
    const updatedFormValue = Object.assign({}, this.state.value, {
      [fieldName]: value
    });
    this.setState({
      value: updatedFormValue
    });
  };

  private handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.onSubmit(this.state.value);
  }
}