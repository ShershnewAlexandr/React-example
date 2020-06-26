import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { cardsActions, cardsSelectors } from '../ducks/cards';
import { AppActions, ICard } from '../types/commonTypes';
import CardListPage from '../components/pages/cardListPage/CardListPage';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  likePostAction: bindActionCreators(cardsActions.likePost, dispatch),
  setEditPostAction: bindActionCreators(cardsActions.setEditPost, dispatch),
});

interface SelectorProps {
  cards: Array<ICard>;
  isAdmin: boolean;
}

type ActionProps = ReturnType<typeof mapDispatchToProps>;

export type CardListPageContainerProps = SelectorProps & ActionProps;

function CardListPageContainer(props: CardListPageContainerProps) {
  return <CardListPage {...props} />;
}

export default connect<SelectorProps, ActionProps>(
  cardsSelectors.cardListPageSelector,
  mapDispatchToProps,
)(CardListPageContainer);
