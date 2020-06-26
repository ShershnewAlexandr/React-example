import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import loaderGif from '../../assets/img/loader.gif';

function Loader() {
  const { t } = useTranslation();
  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <img className="loader" src={loaderGif} alt="Loader ..." />
      </Grid>
      <Grid item>
        <span>{t('loader')}</span>
      </Grid>
    </Grid>
  );
}

export default Loader;
