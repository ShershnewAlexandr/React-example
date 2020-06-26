import { fromJS } from 'immutable';
import reducer from './reducer';
import * as types from './types';

describe('progressBar-reducer', () => {
  it('next step', () => {
    const initialState = fromJS({
      step: 4,
    });
    const action = {
      type: types.NEXT_STEP,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        step: 5,
      }),
    );
  });

  it('back step', () => {
    const initialState = fromJS({
      step: 4,
    });
    const action = {
      type: types.BACK_STEP,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        step: 3,
      }),
    );
  });

  it('open avatar', () => {
    const initialState = fromJS({
      avatar: null,
    });
    const action = {
      type: types.OPEN_AVATAR,
      avatarURL: '/url',
      files: {
        base64: 'dd,base64',
        fileList: [
          {
            name: 'name',
            size: 'size',
            type: 'type',
          },
        ],
      },
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        avatar: {
          base64: 'base64',
          preURL: action.avatarURL,
        },
      }).setIn(['avatar', 'fileInfo'], {
        name: 'name',
        size: 'size',
        type: 'type',
      }),
    );
  });

  it('start loader', () => {
    const initialState = fromJS({
      isLoading: null,
    });
    const action = {
      type: types.START_LOADER,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        isLoading: true,
      }),
    );
  });

  it('end loader', () => {
    const initialState = fromJS({
      isLoading: null,
    });
    const action = {
      type: types.END_LOADER,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        isLoading: false,
      }),
    );
  });
});
