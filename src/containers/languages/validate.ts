import { Map } from 'immutable';
import store, { AppState } from '../../store';

interface Error {
  [key: string]: string;
}

const validate = (values: Map<string, any>) => {
  const state: AppState = store.getState();
  const errors: Error = {};

  const languageList = state.getIn(['login', 'languagesList']);

  if (languageList) {
    for (let lang of Object.values<{ code: string }>(languageList)) {
      const value = values.get(lang.code);
      if (!value) {
        errors[lang.code] = 'errors.required';
      } else if (isNaN(value)) {
        errors[lang.code] = 'errors.notNumber';
      } else if (Number(value) > 5 || Number(value) < 0) {
        errors[lang.code] = 'errors.[0,5]Range';
      }
    }
  }
  return errors;
};

export default validate;
