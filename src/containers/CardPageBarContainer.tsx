import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { cardsActions, cardsSelectors } from '../ducks/cards';
import { AppActions } from '../types/commonTypes';
import CardPageBar from '../components/cardPageBar/CardPageBar';
import { PostsMeta } from '../ducks/cards/selectors';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  nextPageAction: bindActionCreators(cardsActions.nextPage, dispatch),
  backPageAction: bindActionCreators(cardsActions.backPage, dispatch),
});

type SelectorProps = PostsMeta;

type ActionProps = ReturnType<typeof mapDispatchToProps>;

export type CardPageBarContainerProps = SelectorProps & ActionProps;

function CardPageBarContainer(props: CardPageBarContainerProps) {
  return <CardPageBar {...props} />;
}

export default connect<SelectorProps, ActionProps>(
  cardsSelectors.postsMetaSelector,
  mapDispatchToProps,
)(CardPageBarContainer);
