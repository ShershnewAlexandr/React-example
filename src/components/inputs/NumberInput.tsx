import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import newId from '../../utils/newid';
import './InputsStyles.css';

interface NumberInputProps {
  label: string;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
}

function NumberInput(props: NumberInputProps & WrappedFieldProps) {
  const id = newId();
  const { label, min, max, step, input, meta, disabled } = props;
  const { invalid, touched, error } = meta;
  const { t } = useTranslation();

  return (
    <Grid container>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        {...input}
        min={min}
        max={max}
        step={step}
        className={invalid && touched ? 'text-input-error' : ''}
        disabled={disabled}
      />
      {invalid && touched && <div className="error">{t(error)}</div>}
    </Grid>
  );
}

export default NumberInput;
