import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddCard from '../../cards/AddCard';
import Card from '../../cards/Card';
import { ICard } from '../../../types/commonTypes';
import { routes } from '../../../utils/constants';
import { CardListPageContainerProps } from '../../../containers/CardListPageContainer';
import CardPageBarContainer from '../../../containers/CardPageBarContainer';
import './CardListPageStyles.css';

function CardListPage(props: CardListPageContainerProps) {
  const { t } = useTranslation();

  const { isAdmin, likePostAction, setEditPostAction } = props;
  const cards = props.cards.map((info: ICard) => (
    <Grid item key={info.id}>
      <Card
        {...info}
        isAdmin={isAdmin}
        likePostAction={likePostAction}
        setEditPostAction={setEditPostAction}
      />
    </Grid>
  ));

  return (
    <Grid container>
      <Grid
        item
        container
        direction="row"
        alignItems="flex-end"
        justify="flex-end"
      >
        <Grid item sm={1}>
          <Link to={routes.SIGNIN}>
            <span>{t('cardList.signOut')}</span>
          </Link>
        </Grid>
      </Grid>
      <Grid
        item
        className="cardlist-container"
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        {isAdmin && (
          <Grid item>
            <AddCard />
          </Grid>
        )}
        {cards}
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <CardPageBarContainer />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CardListPage;
