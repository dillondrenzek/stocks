import React, { useEffect, useState } from 'react';
import { Portfolio } from '../../types/portfolio';
import { Button, Grid, TextField } from '../shared';

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
    <form onSubmit={handleSubmit}>
      <Grid container direction={'row'} alignItems='center' spacing={2}>
        {/* <Grid alignItems='center' item> */}
          <TextField
            label={'Name'}
            name='name'
            onChange={onFieldChange('name')}
            value={value.name}
          />
        {/* </Grid>
        <Grid item> */}
          <Button
            color='primary'
            type='submit'
            variant='text'
          >
            New Portfolio
          </Button>
        {/* </Grid> */}
      </Grid>
    </form>
  );
}
