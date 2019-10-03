import React, { useState } from 'react';
import { OptionTransaction } from '../../../types';
import { Row, Alert, Button, Col, Form } from '../../../shared';
import { validationOptionTransaction } from './validations';


export interface OptionTransactionFormProps {
  onSubmit: (value: OptionTransaction) => void;
  value: OptionTransaction;
}

export default function OptionTransactionForm(props: OptionTransactionFormProps) {
  const [formValue, setFormValue] = useState<OptionTransaction>(props.value);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const onFieldChange = (fieldName: string) => (ev) => {
    const value = ev.currentTarget.value;
    const updatedFormValue = Object.assign({}, formValue, {
      [fieldName]: value
    });
    setErrorMsg('');
    setFormValue(updatedFormValue);
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // Validate
    const error = validationOptionTransaction(formValue);
    if (error) {
      setErrorMsg(error);
      return;
    }

    // Submit
    props.onSubmit(formValue);
  };

  return (
    <Form onSubmit={handleSubmit}>

      {errorMsg && (
        <Alert variant='danger'>
          {errorMsg}
        </Alert>
      )}

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Symbol</Form.Label>
          <Form.Control 
            type='text'
            name='symbol'
            placeholder='SYM'
            value={formValue.symbol}
            onChange={onFieldChange('symbol')}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Side</Form.Label>
          <Form.Control 
            as='select'
            name='side'
            placeholder='SYM'
            value={formValue.side}
            onChange={onFieldChange('side')}
          >
            <option value='buy'>Buy</option>
            <option value='sell'>Sell</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Strike</Form.Label>
          <Form.Control
            type='string'
            name='strikePrice'
            placeholder='0.00'
            value={formValue.strikePrice.toString()}
            onChange={onFieldChange('strikePrice')}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Call/Put</Form.Label>
          <Form.Control 
            as='select'
            name='callPut'
            value={formValue.callPut}
            onChange={onFieldChange('callPut')}
          >
            <option value='call'>Call</option>
            <option value='put'>Put</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Expire Date</Form.Label>
          <Form.Control
            type='text'
            name='expirationDate'
            placeholder='Mth DD YY'
            value={formValue.expirationDate}
            onChange={onFieldChange('expirationDate')}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Quantity</Form.Label>
          <Form.Control 
            type='number'
            name='quantity'
            placeholder='0'
            value={formValue.quantity.toString()}
            onChange={onFieldChange('quantity')}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type='number'
            name='price'
            placeholder='0.00'
            value={formValue.price.toString()}
            onChange={onFieldChange('price')}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Date</Form.Label>
          <Form.Control 
            type='text'
            name='date'
            placeholder=''
            value={formValue.date.toString()}
            onChange={onFieldChange('date')}
          />
        </Form.Group>
      </Form.Row>

      <Button type='submit'>
        New Stock Trade
      </Button>
      
    </Form>
  );
}

//  extends React.Component<StockTradeFormProps, StockTradeFormState> {

//   constructor(props) {
//     super(props);

//     this.state = {
//       value: new OptionTransaction({ side: 'buy' })
//     };
//   }

//   public render() {
//     const {value} = this.state;
//     return (

//     );
//   }


// }
