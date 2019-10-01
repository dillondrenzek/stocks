import React, { useState } from 'react';
import { Portfolio } from '../../../types/portfolio';
import { Button, Col, Form, Row } from '../../../shared';

export interface PortfolioFormProps {
  onSubmit: (value: Portfolio) => void;
  value: Portfolio;
}

export function PortfolioForm(props: PortfolioFormProps) {

  const {
    onSubmit,
  } = props;

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
