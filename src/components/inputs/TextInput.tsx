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
  isPassword: boolean;
}

function TextInput(props: TextInputProps & WrappedFieldProps) {
  const id = newId();
  const { label, placeholder, disabled, isPassword, input, meta } = props;
  const { invalid, touched, error } = meta;
  const { t } = useTranslation();

  return (
    <Grid container item>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={isPassword ? 'password' : 'text'}
        {...input}
        className={invalid && touched ? 'text-input-error' : ''}
        placeholder={placeholder}
        disabled={disabled}
      />
      {invalid && touched && <div className="error">{t(error)}</div>}
    </Grid>
  );
}

export default TextInput;
