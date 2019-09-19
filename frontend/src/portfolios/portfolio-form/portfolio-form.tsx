import React, { useEffect, useState } from 'react';
import { Portfolio } from '../../types/portfolio';
import { Button, Col, Form, FormControl, Row } from '../../shared';
import { Alert } from 'react-bootstrap';

export interface PortfolioFormProps {
  onSubmit: (value: Portfolio) => void;
  value: Portfolio;
}

export function PortfolioForm(props: PortfolioFormProps) {

  const {
    onSubmit,
  } = props;

  const [ value, setValue ] = useState<Portfolio>(props.value);

  const onFieldChange = (fieldName: string) => (ev: React.ChangeEvent<HTMLInputElement>) => {
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
            placeholder='Name'
            type='text'
          />
        </Col>
        {/* <TextField
          label={'Name'}
          name='name'
          onChange={onFieldChange('name')}
          value={value.name}
        /> */}
        <Col xs='auto'>
          <Button>
            New Portfolio
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
