import { fromJS } from 'immutable';
import reducer from './reducer';
import * as types from './types';
import { createTypedMap } from '../../types/commonTypes';

describe('card-reducer', () => {
  it('put posts', () => {
    const initialState = fromJS({
      posts: {},
      isLoading: false,
      postsMeta: createTypedMap({}),
    });
    const action = {
      type: types.PUT_POSTS,
      posts: fromJS({ '3': { postData: 'data' } }),
      postsMeta: createTypedMap({ id: 78 }),
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        posts: action.posts,
        isLoading: false,
        postsMeta: action.postsMeta,
      }),
    );
  });

  it('start loading', () => {
    const initialState = fromJS({
      posts: {},
      isLoading: false,
    });
    const action = {
      type: types.START_LOADING,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        posts: {},
        isLoading: true,
      }),
    );
  });

  it('end loading', () => {
    const initialState = fromJS({
      posts: {},
      isLoading: true,
    });
    const action = {
      type: types.END_LOADING,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        posts: {},
        isLoading: false,
      }),
    );
  });

  it('next page', () => {
    const initialState = fromJS({
      postsMeta: {
        current_page: 1,
        last_page: 4,
      },
    });
    const action = {
      type: types.NEXT_PAGE,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        postsMeta: {
          current_page: 2,
          last_page: 4,
        },
      }),
    );
  });

  it('back page', () => {
    const initialState = fromJS({
      postsMeta: {
        current_page: 2,
        last_page: 4,
      },
    });
    const action = {
      type: types.BACK_PAGE,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        postsMeta: {
          current_page: 1,
          last_page: 4,
        },
      }),
    );
  });

  it('delete post', () => {
    const initialState = fromJS({
      postsMeta: {
        total: 61,
        current_page: 5,
        last_page: 5,
        per_page: 15,
      },
    });
    const action = {
      type: types.DELETE_POST,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        postsMeta: {
          total: 61,
          current_page: 4,
          last_page: 5,
          per_page: 15,
        },
      }),
    );
  });

  it('put load editPost', () => {
    const initialState = fromJS({
      editPost: {},
    });
    const action = {
      type: types.PUT_LOAD_EDIT_POST,
      post: {
        postData: 'data',
      },
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        editPost: null,
      }).set('editPost', action.post),
    );
  });

  it('set editPost', () => {
    const post = { id: 8, content: 'content', title: 'title' };
    const initialState = fromJS({
      posts: {
        '8': post,
      },
      editPost: {},
    });
    const action = {
      type: types.SET_EDIT_POST,
      id: 8,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        posts: {
          '8': post,
        },
        editPost: null,
      }).set('editPost', {
        content: 'content',
        title: 'title',
      }),
    );
  });
});
