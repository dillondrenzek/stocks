import React, { useState } from 'react';
import { Portfolio } from '../../../types/portfolio';
import { Button, Col, Form, Row } from '../../../shared';
import { PortfolioAPI } from '../../../api/portfolio-api';

export interface PortfolioFormProps {
  onSubmit: (value: Portfolio) => void;
  value: Portfolio;
}

export function usePortfolioForm(portfolio: Portfolio) {

  const [value, setValue] = useState<Portfolio>(portfolio);

  const getFieldChangeHandler = (fieldName: keyof Portfolio) => (ev) => {
    const fieldValue = ev.currentTarget.value;
    const updatedFormValue = {
      ...value,
      [fieldName]: fieldValue
    };
    console.log('Change', fieldName);
    setValue(updatedFormValue);
  };

  const submitForm = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // submit form
    PortfolioAPI.createPortfolio(value)
      .then(() => {
        console.log('Successfully saved portfolio');
        setValue(new Portfolio());
      })
      .catch((err) => {
        console.error('Error saving portfolio', err);
      });

    // on success, reset
    // console.log('Submit:', value);

    // on fail, print error
  };

  return {
    value,
    setValue,
    getFieldChangeHandler,
    submitForm
  };
}

export function PortfolioForm(props: PortfolioFormProps) {

  const {
    onSubmit,
  } = props;

  const {} = usePortfolioForm(props.value);

  const [ value, setValue ] = useState<Portfolio>(props.value);

  const onFieldChange = (fieldName: string) => (ev) => {
    const fieldValue = ev.currentTarget.value;
    const updatedFormValue = Object.assign({}, value, {
      [fieldName]: fieldValue
    });
    setValue(updatedFormValue);
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(value);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row noGutters>
        <Col>
          <Form.Control
            onChange={onFieldChange('name')}
            placeholder='Name'
            type='text'
            value={value.name}
          />
        </Col>
        <Col xs='auto'>
          <Button type='submit'>
            New Portfolio
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
