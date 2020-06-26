import React from 'react';
import { Grid } from '@material-ui/core';
import newId from '../../utils/newid';
import './InputsStyles.css';

interface CheckboxInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled: boolean;
}

function CheckboxInput({ label, onChange, disabled }: CheckboxInputProps) {
  const id = newId();

  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      <Grid item>
        <label htmlFor={id}>{label}</label>
      </Grid>
      <Grid item>
        <input
          id={id}
          type="checkbox"
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}

export default CheckboxInput;
