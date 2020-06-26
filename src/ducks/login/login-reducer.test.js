import { fromJS } from 'immutable';
import reducer from './reducer';
import * as types from './types';

describe('login-reducer', () => {
  it('save token', () => {
    const initialState = fromJS({
      token: null,
    });
    const action = {
      type: types.SAVE_TOKEN,
      token: 'token',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        token: action.token,
      }),
    );
  });

  it('save user', () => {
    const initialState = fromJS({
      user: null,
    });
    const action = {
      type: types.SAVE_CURRENT_USER,
      user: 'user',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        user: action.user,
      }),
    );
  });

  it('save languages', () => {
    const initialState = fromJS({
      languagesList: null,
    });
    const action = {
      type: types.SAVE_LANGUAGES_LIST,
      languagesList: 'languages list',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        languagesList: action.languagesList,
      }),
    );
  });

  it('start login', () => {
    const initialState = fromJS({
      isLogining: null,
    });
    const action = {
      type: types.START_LOGIN,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        isLogining: true,
      }),
    );
  });

  it('end login', () => {
    const initialState = fromJS({
      isLogining: null,
    });
    const action = {
      type: types.END_LOGIN,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        isLogining: false,
      }),
    );
  });
});
