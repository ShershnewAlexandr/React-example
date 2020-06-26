import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import newId from '../../utils/newid';
import './InputsStyles.css';

interface DateInputProps {
  label: string;
  disabled: boolean;
}

function DateInput({
  label,
  disabled,
  input,
  meta,
}: DateInputProps & WrappedFieldProps) {
  const id = newId();
  const { invalid, touched, error } = meta;
  const { t } = useTranslation();

  return (
    <Grid container>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="date"
        {...input}
        className={invalid && touched ? 'text-input-error' : ''}
        disabled={disabled}
      />
      {invalid && touched && <div className="error">{t(error)}</div>}
    </Grid>
  );
}

export default DateInput;
