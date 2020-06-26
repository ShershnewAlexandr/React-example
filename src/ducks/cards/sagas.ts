import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { submit } from 'redux-form';
import { getFormSyncErrors } from 'redux-form/immutable';
import { normalize, schema } from 'normalizr';
import { fromJS } from 'immutable';
import * as cardsActions from './actions';
import * as cardsSelectors from './selectors';
import * as types from './types';
import { rest, routes } from '../../utils/constants';
import { restApi } from '../../utils/restApi';

export function getPostsRequest(page) {
  return restApi.get(rest.posts, {
    params: {
      page,
    },
  });
}

export function* getPostsSaga() {
  const pageMeta = yield select(cardsSelectors.postsMetaSelector);
  const posts = yield call(getPostsRequest, pageMeta.currentPage);
  const postSchema = new schema.Entity('posts');
  const postListSchema = [postSchema];
  const normalizedPosts = normalize(posts.data.data.posts, postListSchema);
  yield put(
    cardsActions.putPosts(normalizedPosts.entities.posts, posts.data.data.meta),
  );
}

export function addPostRequest(post) {
  return restApi.post(rest.posts, {
    title: post.title,
    content: post.content,
  });
}

export function* addPostSaga() {
  yield put(submit('addPost'));
  const errors = yield select(getFormSyncErrors('addPost'));
  if (fromJS(errors).size === 0) {
    yield put(cardsActions.startLoading());
    const post = yield select(cardsSelectors.newPostSelector);
    yield call(addPostRequest, post);
    yield call(getPostsSaga);
    yield put(push(routes.CARDLIST));
    yield put(cardsActions.endLoading());
  }
}

export function editPostRequest(action: types.EditPostAction, post) {
  return restApi.put(rest.post(action.id), {
    title: post.title,
    content: post.content,
  });
}

export function* editPostSaga(action: types.EditPostAction) {
  yield put(submit('editPost'));
  const errors = yield select(getFormSyncErrors('editPost'));
  if (fromJS(errors).size === 0) {
    yield put(cardsActions.startLoading());
    const post = yield select(cardsSelectors.editPostSelector);
    yield call(editPostRequest, action, post);
    yield call(getPostsSaga);
    yield put(push(routes.CARDLIST));
    yield put(cardsActions.endLoading());
  }
}

export function deletePostRequest(action: types.DeletePostAction) {
  return restApi.delete(rest.post(action.id));
}

export function* deletePostSaga(action: types.DeletePostAction) {
  yield put(cardsActions.startLoading());
  yield call(deletePostRequest, action);
  yield call(getPostsSaga);
  yield put(push(routes.CARDLIST));
  yield put(cardsActions.endLoading());
}

export function likePostRequest(action: types.LikePostAction) {
  return restApi.post(rest.likePost(action.id));
}

export function* likePostSaga(action: types.LikePostAction) {
  yield call(likePostRequest, action);
  yield call(getPostsSaga);
}

export function loadEditPostRequest(id: number) {
  return restApi.get(rest.post(id));
}

export function* loadEditPostSaga(action: types.LoadEditPostAction) {
  const editPostResponse = yield call(loadEditPostRequest, action.id);
  if (editPostResponse.data.success) {
    yield put(
      cardsActions.putLoadEditPost({
        title: editPostResponse.data.data.post.title,
        content: editPostResponse.data.data.post.content,
      }),
    );
  }
}

export function* cardsSagas() {
  yield all([
    takeLatest(types.GET_POSTS, getPostsSaga),
    takeLatest(types.NEXT_PAGE, getPostsSaga),
    takeLatest(types.BACK_PAGE, getPostsSaga),
    takeLatest(types.ADD_POST, addPostSaga),
    takeLatest(types.EDIT_POST, editPostSaga),
    takeLatest(types.DELETE_POST, deletePostSaga),
    takeLatest(types.LIKE_POST, likePostSaga),
    takeLatest(types.LOAD_EDIT_POST, loadEditPostSaga),
  ]);
}
