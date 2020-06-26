import React from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form/immutable';
import { InjectedFormProps } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routes } from '../../utils/constants';
import TextInput from '../inputs/TextInput';

function RegisterForm(props: InjectedFormProps) {
  const { handleSubmit, submitting } = props;
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12}>
          <Field
            name="email"
            component={TextInput}
            label={t('register.email')}
            disabled={submitting}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="password"
            component={TextInput}
            label={t('register.password')}
            disabled={submitting}
            isPassword={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="name"
            component={TextInput}
            label={t('register.name')}
            disabled={submitting}
          />
        </Grid>
        <Grid item container justify="center" spacing={2}>
          <Grid item>
            {!submitting && (
              <button
                type="submit"
                data-testid="registerButton"
                className="editCardWrapper-CancelButton"
              >
                {t('register.register')}
              </button>
            )}
          </Grid>
          <Grid item>
            {!submitting && (
              <Link to={routes.SIGNIN}>
                <button
                  type="submit"
                  data-testid="cancelButton"
                  className="editCardWrapper-CancelButton"
                >
                  {t('register.cancel')}
                </button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
