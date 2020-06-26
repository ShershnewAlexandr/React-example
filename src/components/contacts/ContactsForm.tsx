import React from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import TextInput from '../inputs/TextInput';
import DateInput from '../inputs/DateInput';
import PhotoInput from '../inputs/PhotoInput';
import { ContactsFormContainerProps } from '../../containers/contacts/ContactsFormContainer';

function ContactsForm({
  onloadAvatarAction,
  prerenderAvatarURL,
  handleSubmit,
  isLoading,
}: ContactsFormContainerProps) {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={6}>
          <Field
            name="firstName"
            component={TextInput}
            label={t('contacts.firstname')}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            name="lastName"
            component={TextInput}
            type="date"
            label={t('contacts.lastname')}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="dateOfBirthday"
            component={DateInput}
            label={t('contacts.dateOfBirthday')}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="photo"
            component={PhotoInput}
            label={t('contacts.photo')}
            onClickAction={onloadAvatarAction}
            prerenderPhotoURL={prerenderAvatarURL}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default ContactsForm;
