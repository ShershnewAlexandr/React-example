import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateInput from './DateInput';
import CheckboxInput from './CheckboxInput';
import './InputsStyles.css';

interface EndDateInputProps {
  disabled: boolean;
  checked: boolean;
  checkboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

function EndDateInput(props: EndDateInputProps & WrappedFieldProps) {
  const { t } = useTranslation();
  const { disabled, checked, checkboxChange } = props;
  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={10}>
        <DateInput {...props} disabled={checked || disabled} />
      </Grid>
      <Grid item xs={2}>
        <CheckboxInput
          onChange={checkboxChange}
          label={t('education.now')}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}

export default EndDateInput;
