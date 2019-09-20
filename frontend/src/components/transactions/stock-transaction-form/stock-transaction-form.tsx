import React, { useState } from 'react';
import { StockTransaction } from '../../../types';
import { Row, Alert, Button, Col, Form } from '../../../shared';
import { validationStockTransaction } from './validations';


export interface StockTransactionFormProps {
  onSubmit: (value: StockTransaction) => void;
  value: StockTransaction;
}

export default function StockTransactionForm(props: StockTransactionFormProps) {
  const [formValue, setFormValue] = useState<StockTransaction>(props.value);
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
    const error = validationStockTransaction(formValue);
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
          <Form.Label>Side</Form.Label>
          <Form.Control 
            type='text'
            name='side'
            placeholder='buy, sell'
            value={formValue.side.toString()}
            onChange={onFieldChange('side')}
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
//       value: new StockTransaction({ side: 'buy' })
//     };
//   }

//   public render() {
//     const {value} = this.state;
//     return (

//     );
//   }


// }
