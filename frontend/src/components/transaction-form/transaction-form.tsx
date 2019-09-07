import React, { useState } from 'react';
import { StockTransaction } from '../../types';
import { Button, Grid, TextField } from '../shared';

export interface TransactionFormProps {
  onSubmit: (value: StockTransaction) => void;
  // value: ;
}

interface StockTradeFormState {
  value: StockTransaction;
}

export default function TransactionForm(props: TransactionFormProps) {

  const [formValue, setFormValue] = useState<StockTransaction>(new StockTransaction());

  const onFieldChange = (fieldName: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;
    const updatedFormValue = Object.assign({}, formValue, {
      [fieldName]: value
    });
    setFormValue(updatedFormValue);
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    props.onSubmit(formValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={'row'} spacing={2}>
        <Grid item>
          <TextField
            label={'Symbol'}
            name='symbol'
            onChange={onFieldChange('symbol')}
            value={formValue.symbol}
          />
        </Grid>
        <Grid item>
          <TextField
            label={'Quantity'}
            name='quantity'
            onChange={onFieldChange('quantity')}
            value={formValue.quantity}
          />
        </Grid>
        <Grid item>
          <TextField
            label={'Price'}
            name='price'
            onChange={onFieldChange('price')}
            value={formValue.price}
          />
        </Grid>
        <Grid item>
          <TextField
            label={'Side'}
            name='side'
            onChange={onFieldChange('side')}
            value={formValue.side}
          />
        </Grid>
        <Grid item>
          <Button
            color='primary'
            type='submit'
            variant='text'
          >
            New Stock Trade
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

//  extends React.Component<StockTradeFormProps, StockTradeFormState> {

//   constructor(props) {
//     super(props);

//     this.state = {
//       value: new StockTransaction({ side: 'buy' })
//     };
//   }

//   public render() {
//     const {value} = this.state;
//     return (

//     );
//   }


// }
