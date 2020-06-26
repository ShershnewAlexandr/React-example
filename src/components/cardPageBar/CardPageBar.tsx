import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CardPageBarContainerProps } from '../../containers/CardPageBarContainer';
import './CardPageBarStyles.css';

function CardPageBar(props: CardPageBarContainerProps) {
  const { nextPageAction, backPageAction, currentPage, lastPage } = props;
  const backButtonDisable = currentPage === 1;
  const nextButtonDisable = currentPage === lastPage;
  const { t } = useTranslation();

  return (
    <Grid container spacing={4}>
      <Grid item sm={4}>
        <button
          className={
            backButtonDisable ? 'disabledButton' : 'card-page-bar-button'
          }
          onClick={backPageAction}
          disabled={backButtonDisable}
        >
          <i className="material-icons arrows-page-bar">arrow_back</i>
        </button>
      </Grid>
      <Grid item sm={4}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <span>
              <span>{currentPage}</span>
              {` ${t('cardPageBar.of')}  ${lastPage}`}
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={4}>
        <button
          className={
            nextButtonDisable ? 'disabledButton' : 'card-page-bar-button'
          }
          onClick={nextPageAction}
          disabled={nextButtonDisable}
        >
          <i className="material-icons arrows-page-bar">arrow_forward</i>
        </button>
      </Grid>
    </Grid>
  );
}

export default CardPageBar;
