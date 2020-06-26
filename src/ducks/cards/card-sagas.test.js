import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './actions';
import * as sagas from './sagas';
import * as selectors from './selectors';
import { submit } from 'redux-form';
import { getPostsSaga } from './sagas';
import { push } from 'connected-react-router';
import { routes } from '../../utils/constants';
import { deletePostSaga } from './sagas';
import { likePostSaga } from './sagas';

jest.mock('i18next', () => ({
  use: () => {
    return { use: () => 5 };
  },
  init: () => {},
}));

it('getPostsSaga', () => {
  const posts = {
    data: { data: { posts: [{ id: 1 }, { id: 2 }, { id: 3 }] } },
  };
  const postsMeta = {
    current_page: 3,
  };
  const normalizedPosts = { '1': { id: 1 }, '2': { id: 2 }, '3': { id: 3 } };
  return expectSaga(sagas.getPostsSaga)
    .provide([
      [matchers.call.fn(sagas.getPostsRequest), posts],
      [matchers.select.selector(selectors.postsMetaSelector), postsMeta],
    ])
    .select(selectors.postsMetaSelector)
    .call(sagas.getPostsRequest, postsMeta.currentPage)
    .put(actions.putPosts(normalizedPosts))
    .run();
});

it('addPostSaga', () => {
  const post = { id: 4 };

  return expectSaga(sagas.addPostSaga)
    .provide([
      [matchers.call.fn(sagas.addPostRequest)],
      [matchers.call.fn(sagas.getPostsSaga)],
      [matchers.select.selector(selectors.newPostSelector), post],
    ])
    .put(submit('addPost'))
    .put(actions.startLoading())
    .select(selectors.newPostSelector)
    .call(sagas.addPostRequest, post)
    .call(getPostsSaga)
    .put(push(routes.CARDLIST))
    .put(actions.endLoading())
    .run();
});

it('editPostSaga', () => {
  const post = { id: 4 };
  const action = {};

  return expectSaga(sagas.editPostSaga, action)
    .provide([
      [matchers.call.fn(sagas.editPostRequest)],
      [matchers.call.fn(sagas.getPostsSaga)],
      [matchers.select.selector(selectors.editPostSelector), post],
    ])
    .put(submit('editPost'))
    .put(actions.startLoading())
    .select(selectors.editPostSelector)
    .call(sagas.editPostRequest, action, post)
    .call(getPostsSaga)
    .put(push(routes.CARDLIST))
    .put(actions.endLoading())
    .run();
});

it('deletePostSaga', () => {
  const action = {};

  return expectSaga(sagas.deletePostSaga, action)
    .provide([
      [matchers.call.fn(sagas.deletePostRequest)],
      [matchers.call.fn(sagas.getPostsSaga)],
    ])
    .put(actions.startLoading())
    .call(sagas.deletePostRequest, action)
    .call(sagas.getPostsSaga)
    .put(push(routes.CARDLIST))
    .put(actions.endLoading())
    .run();
});

it('likePostSaga', () => {
  const action = {};

  return expectSaga(sagas.likePostSaga, action)
    .provide([
      [matchers.call.fn(sagas.likePostRequest)],
      [matchers.call.fn(sagas.getPostsSaga)],
    ])
    .call(sagas.likePostRequest, action)
    .call(sagas.getPostsSaga)
    .run();
});
