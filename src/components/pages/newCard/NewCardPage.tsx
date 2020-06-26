import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewCardFormContainer from '../../../containers/newCard/NewCardFormContainer';
import { NewCardPageContainerProps } from '../../../containers/newCard/NewCardPageContainer';
import CardLoader from '../../loaders/CardLoader';
import { routes } from '../../../utils/constants';
import './NewCardPageStyles.css';

function NewCardPage(props: NewCardPageContainerProps) {
  const { t } = useTranslation();
  const { addPostAction, isLoading } = props;

  return (
    <Grid container alignItems="center" justify="center">
      <Grid
        item
        className="newCardWrapper-container"
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <span className="newCardWrapper-title">{t('newCard.newCard')}</span>
        </Grid>
        <Grid item>
          <NewCardFormContainer />
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justify="center"
          spacing={2}
        >
          {isLoading ? (
            <CardLoader />
          ) : (
            <>
              <Grid item>
                <button
                  onClick={addPostAction}
                  className="newCardWrapper-addButton"
                  type="submit"
                >
                  {t('newCard.add')}
                </button>
              </Grid>
              <Grid item>
                <Link to={routes.CARDLIST}>
                  <button
                    className="editCardWrapper-CancelButton"
                    type="submit"
                  >
                    {t('newCard.cancel')}
                  </button>
                </Link>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NewCardPage;
