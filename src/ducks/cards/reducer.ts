import * as types from './types';
import {
  AppActions,
  CardsState,
  createTypedMap,
  TypedMap,
} from '../../types/commonTypes';

const initialState: TypedMap<CardsState> = createTypedMap({
  posts: {},
  postsMeta: createTypedMap<any>({
    current_page: 1,
    total: 1,
    last_page: 1,
    per_page: 15,
  }),
  isLoading: false,
  editPost: {},
});

export default function(
  state: TypedMap<CardsState> = initialState,
  action: AppActions,
): TypedMap<CardsState> {
  const currentPage = state.getIn(['postsMeta', 'current_page']);
  const lastPage = state.getIn(['postsMeta', 'last_page']);
  const total = state.getIn(['postsMeta', 'total']);
  const perPage = state.getIn(['postsMeta', 'per_page']);

  switch (action.type) {
    case types.PUT_POSTS:
      return state
        .set('posts', createTypedMap(action.posts))
        .set('postsMeta', createTypedMap(action.postsMeta));

    case types.START_LOADING:
      return state.set('isLoading', true);

    case types.END_LOADING:
      return state.set('isLoading', false);

    case types.NEXT_PAGE:
      if (currentPage < lastPage)
        return state.setIn(['postsMeta', 'current_page'], currentPage + 1);
      else return state;

    case types.BACK_PAGE:
      if (currentPage > 1)
        return state.setIn(['postsMeta', 'current_page'], currentPage - 1);
      else return state;

    case types.DELETE_POST:
      if (currentPage === lastPage && total % perPage === 1)
        return state.setIn(['postsMeta', 'current_page'], currentPage - 1);
      else return state;

    case types.PUT_LOAD_EDIT_POST:
      return state.set('editPost', action.post);

    case types.SET_EDIT_POST:
      const post = {
        content: state.getIn(['posts', String(action.id), 'content']),
        title: state.getIn(['posts', String(action.id), 'title']),
      };
      return state.set('editPost', post);

    default:
      return state;
  }
}
