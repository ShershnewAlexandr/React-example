import * as types from './types';
import { AppActions } from '../../types/commonTypes';

export function getPosts(): AppActions {
  return {
    type: types.GET_POSTS,
  };
}

export function putPosts(posts, postsMeta): AppActions {
  return {
    type: types.PUT_POSTS,
    posts,
    postsMeta,
  };
}

export function addPost(): AppActions {
  return {
    type: types.ADD_POST,
  };
}

export function editPost(id: number): AppActions {
  return {
    type: types.EDIT_POST,
    id,
  };
}

export function deletePost(id: number): AppActions {
  return {
    type: types.DELETE_POST,
    id,
  };
}

export function likePost(id: number): AppActions {
  return {
    type: types.LIKE_POST,
    id,
  };
}

export function startLoading(): AppActions {
  return {
    type: types.START_LOADING,
  };
}

export function endLoading(): AppActions {
  return {
    type: types.END_LOADING,
  };
}

export function nextPage(): AppActions {
  return {
    type: types.NEXT_PAGE,
  };
}

export function backPage(): AppActions {
  return {
    type: types.BACK_PAGE,
  };
}

export function loadEditPost(id: number): AppActions {
  return {
    type: types.LOAD_EDIT_POST,
    id,
  };
}

export function putLoadEditPost(post): AppActions {
  return {
    type: types.PUT_LOAD_EDIT_POST,
    post,
  };
}

export function setEditPost(id: number): AppActions {
  return {
    type: types.SET_EDIT_POST,
    id,
  };
}
