import React from 'react';
import { connect } from 'react-redux';
import InformationPage from '../components/pages/informationPage/InformationPage';
import { loginSelectors } from '../ducks/login';

interface InformationPageContainerProps {
  token: string;
}

function InformationPageContainer(props: InformationPageContainerProps) {
  return <InformationPage isLoading={props.token === 'no-token'} />;
}

export default connect(loginSelectors.loginSelector)(InformationPageContainer);
