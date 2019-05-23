import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';

export type SearchActions = ActionType<typeof actions>;

export interface SearchState {
  term: string;
  fetchStatus: FetchStatus;
  discussions: Array<any>;
  datasets: Array<any>;
  posts: Array<any>;
}

const initialState: SearchState = {
  term: '',
  fetchStatus: null,
  discussions: [],
  datasets: [],
  posts: [],
};

export default function(
  state: SearchState = initialState,
  action: SearchActions
) {
  switch (action.type) {
    case getType(actions.fetchSearch):
      return {
        ...initialState,
        term: action.payload,
      };

    case getType(actions.fetchSearchAsync.request):
      return {
        ...initialState,
        fetchStatus: 'loading',
      };

    case getType(actions.fetchSearchAsync.success):
      return {
        ...state,
        fetchStatus: 'loaded',
        discussions: action.payload.result.topics || [],
        posts: action.payload.result.posts || [],
      };

    case getType(actions.fetchSearchAsync.failure):
      return {
        ...state,
        fetchStatus: 'failed',
      };

    default:
      return state;
  }
}
