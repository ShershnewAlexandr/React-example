import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { cardsActions, cardsSelectors } from '../../ducks/cards';
import { AppActions } from '../../types/commonTypes';
import NewCardPage from '../../components/pages/newCard/NewCardPage';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  addPostAction: bindActionCreators(cardsActions.addPost, dispatch),
});

type ActionProps = ReturnType<typeof mapDispatchToProps>;
type SelectorProps = cardsSelectors.IsLoadingSelector;

export type NewCardPageContainerProps = ActionProps & SelectorProps;

function NewCardPageContainer(props: NewCardPageContainerProps) {
  return <NewCardPage {...props} />;
}

export default connect<SelectorProps, ActionProps>(
  cardsSelectors.isLoadingSelector,
  mapDispatchToProps,
)(NewCardPageContainer);
