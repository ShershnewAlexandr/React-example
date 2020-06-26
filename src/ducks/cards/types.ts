export const GET_POSTS = '@@cards/GET_POSTS';
export type GET_POSTS = typeof GET_POSTS;

export interface GetPostsAction {
  type: GET_POSTS;
}

export const PUT_POSTS = '@@cards/PUT_POSTS';
export type PUT_POSTS = typeof PUT_POSTS;

export interface PutPostsAction {
  type: PUT_POSTS;
  posts: any;
  postsMeta: any;
}

export const ADD_POST = '@@cards/ADD_POST';
export type ADD_POST = typeof ADD_POST;

export interface AddPostAction {
  type: ADD_POST;
}

export const EDIT_POST = '@@cards/EDIT_POST';
export type EDIT_POST = typeof EDIT_POST;

export interface EditPostAction {
  type: EDIT_POST;
  id: number;
}

export const DELETE_POST = '@@cards/DELETE_POST';
export type DELETE_POST = typeof DELETE_POST;

export interface DeletePostAction {
  type: DELETE_POST;
  id: number;
}

export const LIKE_POST = '@@cards/LIKE_POST';
export type LIKE_POST = typeof LIKE_POST;

export interface LikePostAction {
  type: LIKE_POST;
  id: number;
}

export const START_LOADING = '@@cards/START_LOADING';
export type START_LOADING = typeof START_LOADING;

export interface StartLoadingAction {
  type: START_LOADING;
}

export const END_LOADING = '@@cards/END_LOADING';
export type END_LOADING = typeof END_LOADING;

export interface EndLoadingAction {
  type: END_LOADING;
}

export const NEXT_PAGE = '@@cards/NEXT_PAGE';
export type NEXT_PAGE = typeof NEXT_PAGE;

export interface NextPageAction {
  type: NEXT_PAGE;
}

export const BACK_PAGE = '@@cards/BACK_PAGE';
export type BACK_PAGE = typeof BACK_PAGE;

export interface BackPageAction {
  type: BACK_PAGE;
}

export const PUT_LOAD_EDIT_POST = '@@cards/PUT_LOAD_EDIT_POST';
export type PUT_LOAD_EDIT_POST = typeof PUT_LOAD_EDIT_POST;

export interface PutLoadEditPostAction {
  type: PUT_LOAD_EDIT_POST;
  post: {
    title: string;
    content: string;
  };
}

export const LOAD_EDIT_POST = '@@cards/LOAD_EDIT_POST';
export type LOAD_EDIT_POST = typeof LOAD_EDIT_POST;

export interface LoadEditPostAction {
  type: LOAD_EDIT_POST;
  id: number;
}

export const SET_EDIT_POST = '@@login/SET_EDIT_POST';
export type SET_EDIT_POST = typeof SET_EDIT_POST;

export interface SetEditPostAction {
  type: SET_EDIT_POST;
  id: number;
}

export type CardsActionTypes =
  | GetPostsAction
  | PutPostsAction
  | AddPostAction
  | EditPostAction
  | DeletePostAction
  | LikePostAction
  | StartLoadingAction
  | EndLoadingAction
  | NextPageAction
  | BackPageAction
  | PutLoadEditPostAction
  | LoadEditPostAction
  | SetEditPostAction;
