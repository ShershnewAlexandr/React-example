import React from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form/immutable';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextInput from '../inputs/TextInput';
import Loader from '../loaders/Loader';
import { LoginFormContainerProps } from '../../containers/login/LoginFormContainer';
import { routes } from '../../utils/constants';
import './LoginFormStyles.css';

function LoginForm(props: LoginFormContainerProps) {
  const { handleSubmit, submitting } = props;
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={2}
        alignItems="center"
      >
        <Grid item container justify="flex-start">
          <Grid item>
            <span className="signin-text">{t('login.signIn')}</span>
          </Grid>
        </Grid>
        <Grid container item spacing={4}>
          <Grid item xs={6}>
            <button type="button" className="social-btn">
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item>
                  <img
                    className="telega-img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMaYOVMQ7Vi3nJW9CDkeoEgxi1Cm51qakpO13zwNnPi62NYJI"
                    alt="telega"
                  />
                </Grid>
                <Grid item>{t('login.telegram')}</Grid>
              </Grid>
            </button>
          </Grid>
          <Grid item xs={6}>
            <button type="button" className="social-btn">
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item>
                  <img
                    className="vk-img"
                    src="https://cdn.icon-icons.com/icons2/1121/PNG/512/1486147202-social-media-circled-network10_79475.png"
                    alt="vk"
                  />
                </Grid>
                <Grid item>{t('login.vk')}</Grid>
              </Grid>
            </button>
          </Grid>
        </Grid>
        <Grid container item>
          <Field
            name="login"
            component={TextInput}
            type="text"
            placeholder={t('login.username')}
            disabled={submitting}
          />
        </Grid>
        <Grid container item>
          <Field
            name="password"
            component={TextInput}
            type="password"
            placeholder={t('login.password')}
            isPassword
            disabled={submitting}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid container item xs={5} alignItems="center">
            <Grid item>
              <Field
                name="rememberMe"
                component="input"
                type="checkbox"
                className="login-checkbox"
                disabled={submitting}
              />
            </Grid>
            <Grid item>
              <span>{t('login.rememberMe')}</span>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {t('login.forgotPassword')}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <button
            type="submit"
            className={submitting ? 'button disabled' : 'button'}
          >
            {t('login.login')}
          </button>
        </Grid>
        <Grid item xs={12}>
          <Link to={routes.REGISTER}>
            <span className="no-accaunt">{t('login.noAccount')}</span>
          </Link>
          <span>{t('login.signIn')}</span>
        </Grid>
        {submitting && <Loader />}
      </Grid>
    </form>
  );
}

export default LoginForm;
