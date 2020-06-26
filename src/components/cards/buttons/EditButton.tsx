import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { routes } from '../../../utils/constants';
import '../CardsStyles.css';

interface EditButtonProps {
  id: number;
  setEditPostAction: any;
}

function EditButton(props: EditButtonProps) {
  const { id, setEditPostAction } = props;
  return (
    <Link
      to={routes.EDITCARDID(id)}
      onClick={() => {
        setEditPostAction(id);
      }}
    >
      <Grid
        container
        className="edit-button-container"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <i className="material-icons md-24">edit</i>
        </Grid>
      </Grid>
    </Link>
  );
}

export default EditButton;
