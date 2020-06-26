import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditCardFormContainer from '../../../containers/editCard/EditCardFormContainer';
import { EditCardPageContainerProps } from '../../../containers/editCard/EditCardPageContainer';
import CardLoader from '../../loaders/CardLoader';
import { routes } from '../../../utils/constants';
import './EditCardPageStyles.css';

interface EditCardPageOwnProps {
  id: number;
}

function EditCardPage(
  props: EditCardPageContainerProps & EditCardPageOwnProps,
) {
  const { t } = useTranslation();
  const { editPostAction, deletePostAction, id, isLoading } = props;

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
            {t('editCard.cardInfo')}
          </span>
        </Grid>
        <Grid item>
          <EditCardFormContainer />
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
                  className="editCardWrapper-saveButton"
                  type="submit"
                  onClick={() => editPostAction(id)}
                >
                  {t('editCard.save')}
                </button>
              </Grid>
              <Grid item>
                <button
                  className="editCardWrapper-deleteButton"
                  type="submit"
                  onClick={() => deletePostAction(id)}
                >
                  {t('editCard.delete')}
                </button>
              </Grid>
              <Grid item>
                <Link to={routes.CARDLIST}>
                  <button
                    className="editCardWrapper-CancelButton"
                    type="submit"
                  >
                    {t('editCard.cancel')}
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

export default EditCardPage;
