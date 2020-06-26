import React from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form/immutable';
import { InjectedFormProps } from 'redux-form';
import TextInput from '../../inputs/TextInput';
import TextAreaInput from '../../inputs/TextAreaInput';
import { useTranslation } from 'react-i18next';

function CardForm(props: InjectedFormProps) {
  const { t } = useTranslation();
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12}>
          <Field
            name="title"
            component={TextInput}
            label={t('cardForm.title')}
            disabled={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="content"
            component={TextAreaInput}
            type="date"
            label={t('cardForm.content')}
            disabled={false}
            rows={6}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default CardForm;
