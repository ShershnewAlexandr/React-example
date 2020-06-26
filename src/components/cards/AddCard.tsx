import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { routes } from '../../utils/constants';
import './CardsStyles.css';

function AddCard() {
  return (
    <div className="add-card-container">
      <Grid
        className="card-space"
        container
        justify="center"
        alignItems="center"
      >
        <Link to={routes.NEWCARD} className="link">
          <Grid item>
            <div className="card-plus-container">
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <span className="card-plus">+</span>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Link>
      </Grid>
    </div>
  );
}

export default AddCard;
