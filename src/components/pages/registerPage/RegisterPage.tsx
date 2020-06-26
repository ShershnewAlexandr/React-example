import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import RegisterFormContainer from '../../../containers/register/RegisterFormContainer';

function RegisterPage() {
  const { t } = useTranslation();
  return (
    <Grid container alignItems="center" justify="center">
      <Grid
        item
        className="editCardWrapper-container"
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <span className="editCardWrapper-title">
            {t('register.registration')}
          </span>
        </Grid>
        <Grid item>
          <RegisterFormContainer />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
