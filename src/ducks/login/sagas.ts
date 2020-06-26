import {
  call,
  all,
  takeLatest,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';
import { matchPath } from 'react-router-dom';
import { push } from 'connected-react-router';
import { history } from '../../store';
import * as types from './types';
import * as loginActions from './actions';
import * as loginSelectors from './selectors';
import { cardsSagas } from '../cards';
import * as commonActions from '../root/actions';
import { rest, routes, steps } from '../../utils/constants';
import { restApi, registerToken } from '../../utils/restApi';
import { loadEditPostSaga } from '../cards/sagas';
import { loadEditPost } from '../cards/actions';

export function* getCurrentStep() {
  const userId = yield select(loginSelectors.userIdSelector);
  return localStorage.getItem(`step${userId}`);
}

export function saveI18n(lang: string) {
  localStorage.setItem('i18n', lang);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function login(action: types.LoginAction) {
  return restApi.post(rest.login, {
    email: action.login,
    password: action.password,
  });
}

export function getCurrentUser() {
  return restApi.get(rest.currentUser);
}

export function getEducation(id: number) {
  return restApi.get(rest.education(id), {
    params: {
      per_page: 5,
    },
  });
}

export function getExperience(id: number) {
  return restApi.get(rest.experience(id), {
    params: {
      per_page: 10,
    },
  });
}

export function getLanguages(id: number) {
  return restApi.get(rest.languages(id), {
    params: {
      per_page: 10,
    },
  });
}

export function getLanguagesList() {
  return restApi.get(rest.languagesList, {
    params: {
      per_page: 10,
    },
  });
}

export function* getLoginDataRequest(id: number) {
  return yield all([
    call(getEducation, id),
    call(getExperience, id),
    call(getLanguages, id),
  ]);
}

export function* getLoginData(token: string) {
  let responseCurrentUser;
  let responseEducations;
  let responseExperiences;
  let responseLanguages;
  yield call(cardsSagas.getPostsSaga);
  try {
    responseCurrentUser = yield call(getCurrentUser);
  } catch (e) {}
  if (responseCurrentUser && responseCurrentUser.data.success) {
    const { user } = responseCurrentUser.data.data;
    try {
      [responseEducations, responseExperiences, responseLanguages] = yield call(
        getLoginDataRequest,
        user.id,
      );
    } catch (e) {}
    if (
      responseEducations &&
      responseExperiences &&
      responseLanguages &&
      responseEducations.data.success &&
      responseExperiences.data.success &&
      responseLanguages.data.success
    ) {
      yield put(
        loginActions.saveCurrentUser(responseCurrentUser.data.data.user),
      );
      yield put(
        commonActions.putStartContacts(
          user.name,
          user.last_name,
          user.birthdate,
          user.avatar,
        ),
      );
      yield put(
        commonActions.putStartEducation(
          responseEducations.data.data.educations,
        ),
      );
      yield put(
        commonActions.putStartExperience(
          responseExperiences.data.data.experiences,
        ),
      );
      yield put(
        commonActions.putStartLanguages(responseLanguages.data.data.languages),
      );

      const step = yield call(getCurrentStep);
      const currentStep = step ? Number(step) : 1;
      yield put(commonActions.putStartStep(currentStep));
      let redirect = '/';
      switch (currentStep) {
        case steps.CONTACTS:
          redirect = routes.CONTACTS;
          break;
        case steps.EDUCATION:
          redirect = routes.EDUCATION;
          break;
        case steps.EXPERIENCE:
          redirect = routes.EXPERIENCE;
          break;
        case steps.LANGUAGES:
          redirect = routes.LANGUAGES;
          break;
        case steps.CARDLIST:
          redirect = routes.CARDLIST;
          break;
        default:
          break;
      }
      yield put(loginActions.saveToken(token));
      const currentPath = history.location.pathname;
      Object.values(routes).forEach(iterPath => {
        if (typeof iterPath !== 'function') {
          const isMatch = matchPath(currentPath, { path: iterPath });
          if (isMatch && iterPath !== routes.SIGNIN) {
            redirect = 'no-redirect';
          }
        }
      });
      if (redirect !== 'no-redirect') {
        history.push(redirect);
      }
    }
  }

  const responseLanguagesList = yield call(getLanguagesList);
  if (responseLanguagesList && responseLanguagesList.data.success) {
    yield put(
      loginActions.saveLanguagesList(responseLanguagesList.data.data.languages),
    );
  }
}

export function* loginSaga(action: types.LoginAction) {
  yield put(loginActions.startLogin());
  let responseLogin;
  try {
    responseLogin = yield call(login, action);
  } catch (e) {}

  if (responseLogin && responseLogin.data.success) {
    const { token } = responseLogin.data.data;
    if (action.rememberMe) {
      yield call(setToken, token);
    } else {
      yield call(removeToken);
    }

    yield call(registerToken, token);
    yield call(getLoginData, token);
    action.resolve();
  } else {
    action.reject({ login: 'errors.incorrectLoginData' });
  }
  yield put(loginActions.endLogin());
}

export function* autoLoginSaga() {
  yield put(loginActions.startLogin());
  const token = yield call(getToken);
  if (token) {
    console.log('auto-login');
    yield call(registerToken, token);

    //for loading editPostData | example route /editcard/3030
    const matchEditPost = matchPath<{ id: string }>(history.location.pathname, {
      path: routes.EDITCARD,
    });
    if (matchEditPost && matchEditPost.isExact) {
      const id = Number(matchEditPost.params.id);
      // @ts-ignore
      yield call(loadEditPostSaga, loadEditPost(id));
    }

    yield call(getLoginData, token);
  }
  yield put(loginActions.endLogin());
}

export function* saveActiveI18nSaga(action: types.SaveActiveI18nAction) {
  yield call(saveI18n, action.lang);
}

export function registerRequest(values) {
  return restApi.post(rest.register, {
    email: values.get('email'),
    password: values.get('password'),
    name: values.get('name'),
  });
}

export function* registerSaga(action: types.RegisterAction) {
  let registerResponse;
  try {
    registerResponse = yield call(registerRequest, action.values);
  } catch (e) {}
  if (registerResponse && registerResponse.data.success) {
    action.resolve();
    yield put(push(routes.SIGNIN));
  } else {
    action.reject({ email: 'errors.incorrectRegisterData' });
  }
}

export default function* loginSagas() {
  yield all([
    takeLatest(types.AUTO_LOGIN, autoLoginSaga),
    takeLatest(types.LOGIN, loginSaga),
    takeLatest(types.REGISTER, registerSaga),
    takeEvery(types.SaveActiveI18n, saveActiveI18nSaga),
  ]);
}
