import { ActionType, getType } from 'typesafe-actions';
import { User } from './types';

import * as actions from './actions';

export type AppActions = ActionType<typeof actions>;

export interface AppState {
  readonly version: string;
  readonly isSidebarOpen: boolean;
  readonly user: User | object;
  readonly fetchStatus: FetchStatus;
}

const initialState: AppState = {
  version: VERSION,
  isSidebarOpen: true,
  user: {},
  fetchStatus: 'idle',
};

export default function(
  state: AppState = initialState,
  action: AppActions
): AppState {
  switch (action.type) {
    case getType(actions.toggleSidebarVisibility):
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };

    case getType(actions.fetchUserAsync.request):
      return {
        ...state,
        fetchStatus: 'loading',
      };

    case getType(actions.fetchUserAsync.failure):
      return {
        ...state,
        fetchStatus: 'failed',
      };

    case getType(actions.fetchUserAsync.success):
      return {
        ...state,
        user: action.payload,
        fetchStatus: 'loaded',
      };

    default:
      return state;
  }
}
