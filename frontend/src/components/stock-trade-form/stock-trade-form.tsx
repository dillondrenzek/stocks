import React from 'react';
import * as MUI from '@material-ui/core';
import { StockTrade } from '../../types/trade';

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
    }
  }

  public componentDidMount() {

  }

  public render() {
    const {value} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <MUI.TextField label={'Date'} name='date' value={value}/> */}
        <MUI.TextField 
          label={'Symbol'} 
          name='symbol' 
          onChange={this.onFieldChange('symbol')}
          value={value.symbol}
        />
        <MUI.TextField 
          label={'Quantity'} 
          name='quantity' 
          onChange={this.onFieldChange('quantity')}
          value={value.quantity}
        />
        <MUI.TextField 
          label={'Price'} 
          name='price'
          onChange={this.onFieldChange('price')}
          value={value.price}
        />
        <MUI.FormControl>
          <MUI.InputLabel htmlFor='stock-trade-form-side'>Side</MUI.InputLabel>
          <MUI.Select 
            input={<MUI.Input name='side' id='stock-trade-form-side' />} 
            onChange={this.onFieldChange('side')}
            value={value.side}
          >
            <MUI.MenuItem value='buy'>Buy</MUI.MenuItem>
            <MUI.MenuItem value='sell'>Sell</MUI.MenuItem>
          </MUI.Select>
        </MUI.FormControl>
        <MUI.Button 
          type='submit' 
          variant='contained'
        >
          Save
        </MUI.Button>
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