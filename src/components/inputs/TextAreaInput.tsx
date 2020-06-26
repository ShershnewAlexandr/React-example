import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import newId from '../../utils/newid';
import './InputsStyles.css';

interface TextInputProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  rows: number;
}

function TextAreaInput(props: TextInputProps & WrappedFieldProps) {
  const id = newId();
  const { label, placeholder, disabled, rows, input, meta } = props;
  const { invalid, touched, error } = meta;
  const { t } = useTranslation();

  return (
    <Grid container item>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        rows={rows}
        {...input}
        className={invalid && touched ? 'text-input-error' : ''}
        disabled={disabled}
      >
        {placeholder}
      </textarea>
      {invalid && touched && <div className="error">{t(error)}</div>}
    </Grid>
  );
}

export default TextAreaInput;
