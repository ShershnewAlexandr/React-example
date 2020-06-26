import { ICard } from '../../types/commonTypes';

export interface NewPostSelector {
  title: string;
  content: string;
}

export function newPostSelector(state): NewPostSelector {
  return {
    title: state.getIn(['form', 'addPost', 'values', 'title']),
    content: state.getIn(['form', 'addPost', 'values', 'content']),
  };
}

export interface EditPostSelector {
  title: string;
  content: string;
}

export function editPostSelector(state): EditPostSelector {
  return {
    title: state.getIn(['form', 'editPost', 'values', 'title']),
    content: state.getIn(['form', 'editPost', 'values', 'content']),
  };
}

export interface cardListPageSelector {
  cards: Array<ICard>;
  isAdmin: boolean;
}

export function cardListPageSelector(state): cardListPageSelector {
  const cards = state.getIn(['cards', 'posts']);
  let cardsArray: Array<ICard>;
  if (Object.entries(cards).length > 0) {
    cardsArray = Object.values(cards.toJS());
  } else {
    cardsArray = [];
  }
  const role = state.getIn(['login', 'user', 'role']);
  return {
    cards: cardsArray,
    isAdmin: role === 'admin',
  };
}

export interface initialEditFormSelector {
  initialValues?: {
    title: string;
    content: string;
  };
}

export function initialEditFormSelector(state): initialEditFormSelector {
  const post = state.getIn(['cards', 'editPost']);
  if (post.title)
    return {
      initialValues: {
        title: post.title,
        content: post.content,
      },
    };
  else return {};
}

export interface IsLoadingSelector {
  isLoading: boolean;
}

export function isLoadingSelector(state): IsLoadingSelector {
  return {
    isLoading: state.getIn(['cards', 'isLoading']),
  };
}

export interface PostsMeta {
  currentPage: number;
  lastPage: number;
}

export function postsMetaSelector(state): PostsMeta {
  return {
    currentPage: state.getIn(['cards', 'postsMeta', 'current_page']),
    lastPage: state.getIn(['cards', 'postsMeta', 'last_page']),
  };
}
