import { call, all } from 'redux-saga/effects';
import { progressBarSagas } from '../progressBar';
import { loginSagas } from '../login';
import { cardsSagas } from '../cards';
import i18n from '../../i18n/i18n';
import { defaultI18nLang } from '../../utils/constants';

function* appStart() {
  const lang = yield call(loadI18n);
  i18n.init({
    lng: lang,
  });
}

function loadI18n() {
  const lang = localStorage.getItem('i18n');
  if (lang) {
    return lang;
  } else {
    return defaultI18nLang;
  }
}

export default function*() {
  yield call(appStart);
  yield all([
    call(loginSagas),
    call(progressBarSagas),
    call(cardsSagas.cardsSagas),
  ]);
}
