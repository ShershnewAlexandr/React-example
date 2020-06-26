import React from 'react';
import { Grid } from '@material-ui/core';
import '../CardsStyles.css';

interface LikeButtonProps {
  id: number;
  liked: boolean;
  totalLikes: number;
  likePostAction: any;
}

interface LikeButtonState {
  liked: boolean;
}

class LikeButton extends React.Component<LikeButtonProps, LikeButtonState> {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.liked,
    };
  }

  onLike = () => {
    const { id, likePostAction } = this.props;
    this.setState({
      liked: !this.state.liked,
    });
    likePostAction(id);
  };

  render() {
    const { totalLikes } = this.props;
    const { liked } = this.state;
    return (
      <Grid
        container
        direction="row"
        className="like-button-container"
        justify="space-around"
        alignItems="center"
        data-testid="likeButton"
        onClick={this.onLike}
      >
        <Grid item>
          <span>{totalLikes}</span>
        </Grid>
        <Grid item>
          <i
            data-testid="like-icon"
            className={
              liked ? 'material-icons md-24 liked' : 'material-icons md-24'
            }
          >
            thumb_up
          </i>
        </Grid>
      </Grid>
    );
  }
}

export default LikeButton;
