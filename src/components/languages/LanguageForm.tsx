import React, { Fragment } from 'react';
import { Field } from 'redux-form/immutable';
import { Grid } from '@material-ui/core';
import NumberInputComponent from '../inputs/NumberInput';
import { Language } from '../../types/formDataTypes';
import { LanguageFormContainerProps } from '../../containers/languages/LanguageFormContainer';

function LanguageForm(props: LanguageFormContainerProps) {
  const { languagesList, handleSubmit, isLoading } = props;
  const languagesElements = languagesList.map((current: Language) => (
    <Fragment key={current.native_name}>
      <Grid item xs={6}>
        <Field
          name={current.code}
          component={NumberInputComponent}
          label={current.native_name}
          min={0}
          max={5}
          step={1}
          disabled={isLoading}
        />
      </Grid>
    </Fragment>
  ));

  return (
    <form onSubmit={handleSubmit} data-testid="languagesForm">
      <Grid container direction="row" spacing={4}>
        {languagesElements}
      </Grid>
    </form>
  );
}

LanguageForm.defaultProps = {
  languagesList: [],
};

export default LanguageForm;
