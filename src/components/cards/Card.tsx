import React from 'react';
import { Grid } from '@material-ui/core';
import EditButton from './buttons/EditButton';
import LikeButton from './buttons/LikeButton';
import { ICard } from '../../types/commonTypes';
import './CardsStyles.css';

interface CardOwnProps {
  isAdmin: boolean;
  likePostAction: any;
  setEditPostAction: any;
}

function Card(props: ICard & CardOwnProps) {
  const {
    id,
    title,
    content,
    total_likes,
    liked,
    likePostAction,
    setEditPostAction,
    isAdmin,
  } = props;
  return (
    <div className="card-container">
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item className="card-title-container">
          <span className="card-title-text">{title}</span>
        </Grid>
        <Grid item className="card-content-container">
          <span className="card-content-text">{content}</span>
        </Grid>
        <Grid
          item
          container
          className="card-buttons-container"
          direction="row"
          justify={isAdmin ? 'space-between' : 'flex-end'}
          alignItems="center"
        >
          {isAdmin && (
            <Grid item data-testid="edit-card-button">
              <EditButton id={id} setEditPostAction={setEditPostAction} />
            </Grid>
          )}
          <Grid item data-testid="like-card-button">
            <LikeButton
              id={id}
              liked={liked}
              totalLikes={total_likes}
              likePostAction={likePostAction}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Card;
