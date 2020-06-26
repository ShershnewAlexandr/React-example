import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import './index.css';
import App from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';
import { history } from './store';
import store from './store';

import './i18n/i18n';

ReactDOM.render(
  // @ts-ignore
  // tslint:disable-next-line:jsx-wrap-multiline
  <Provider store={store}>
    <Router history={history}>
      <Suspense fallback="translation">
        <App />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
