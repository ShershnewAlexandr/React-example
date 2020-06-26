import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { routes } from '../utils/constants';
import InformationPageContainer from '../containers/InformationPageContainer';
import LoginPage from './pages/loginPage/LoginPage';
import I18nHeaderContainer from '../containers/I18nHeaderContainer';
import CardListPageContainer from '../containers/CardListPageContainer';
import NewCardPageContainer from '../containers/newCard/NewCardPageContainer';
import EditCardPageContainer from '../containers/editCard/EditCardPageContainer';
import RegisterPage from './pages/registerPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <I18nHeaderContainer />
      <Switch>
        <Route path={routes.SIGNIN} component={LoginPage} />
        <Route path={routes.INFORMATION} component={InformationPageContainer} />
        <Route path={routes.CARDLIST} component={CardListPageContainer} />
        <Route path={routes.NEWCARD} component={NewCardPageContainer} />
        <Route path={routes.EDITCARD} component={EditCardPageContainer} />
        <Route path={routes.REGISTER} component={RegisterPage} />
        <Route path="/" render={props => <Redirect to={routes.SIGNIN} />} />
      </Switch>
    </div>
  );
}

export default App;
