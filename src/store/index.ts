import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../ducks/root/root-reducer';
import rootSaga from '../ducks/root/root-saga';
import { RootState, TypedMap, createTypedMap } from '../types/commonTypes';

const initialState: TypedMap<{}> = createTypedMap({});

export const history: any = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const browserRouterMiddleware = routerMiddleware(history);

const middleware = [sagaMiddleware, browserRouterMiddleware];

export const reducer = rootReducer(history);

export type AppState = TypedMap<RootState>;

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
