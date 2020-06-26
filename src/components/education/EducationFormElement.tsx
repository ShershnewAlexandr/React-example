import React from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form/lib/immutable';
import { WithTranslation } from 'react-i18next';
import TextInput from '../inputs/TextInput';
import DateInput from '../inputs/DateInput';
import EndDateInputContainer from '../../containers/EndDateInputContainer';

interface EducationFormElementProps {
  element: string;
  disabled: boolean;
}

function EducationFormElement({
  element,
  disabled,
  t,
}: EducationFormElementProps & WithTranslation) {
  return (
    <Grid
      container
      direction="row"
      spacing={4}
      data-testid="education-form-block"
    >
      <Grid item xs={12}>
        <Field
          name={`${element}.schoolName`}
          component={TextInput}
          label={t('education.schoolname')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          name={`${element}.startYear`}
          component={DateInput}
          label={t('education.startYear')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          name={`${element}.endYear`}
          component={EndDateInputContainer}
          label={t('education.endYear')}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}

export default EducationFormElement;
