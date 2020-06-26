import React from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form/lib/immutable';
import { WithTranslation } from 'react-i18next';
import TextInput from '../inputs/TextInput';
import DateInput from '../inputs/DateInput';
import EndDateInputContainer from '../../containers/EndDateInputContainer';

interface ExperienceFormElementProps {
  element: string;
  disabled: boolean;
}

function ExperienceFormElement({
  element,
  disabled,
  t,
}: ExperienceFormElementProps & WithTranslation) {
  return (
    <Grid
      container
      direction="row"
      spacing={4}
      data-testid="experience-form-block"
    >
      <Grid item xs={12}>
        <Field
          name={`${element}.companyName`}
          component={TextInput}
          label={t('experience.companyName')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name={`${element}.profile`}
          component={TextInput}
          label={t('experience.profile')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          name={`${element}.startYear`}
          component={DateInput}
          label={t('experience.startYear')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          name={`${element}.endYear`}
          component={EndDateInputContainer}
          label={t('experience.endYear')}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}

export default ExperienceFormElement;
