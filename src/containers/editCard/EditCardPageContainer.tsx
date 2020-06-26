import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { cardsActions, cardsSelectors } from '../../ducks/cards';
import { AppActions } from '../../types/commonTypes';
import EditCardPage from '../../components/pages/editCard/EditCardPage';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  editPostAction: bindActionCreators(cardsActions.editPost, dispatch),
  deletePostAction: bindActionCreators(cardsActions.deletePost, dispatch),
});

type ActionProps = ReturnType<typeof mapDispatchToProps>;
type SelectorProps = cardsSelectors.IsLoadingSelector;

interface matchParams {
  id: string;
}

export type EditCardPageContainerProps = RouteComponentProps<matchParams> &
  SelectorProps &
  ActionProps;

function EditCardPageContainer(props: EditCardPageContainerProps) {
  return <EditCardPage {...props} id={Number(props.match.params.id)} />;
}

export default connect<SelectorProps, ActionProps>(
  cardsSelectors.isLoadingSelector,
  mapDispatchToProps,
)(EditCardPageContainer);
