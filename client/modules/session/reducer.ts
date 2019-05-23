import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type SessionActions = ActionType<typeof actions>;

export interface SessionState {
  readonly authTime: number | null;
  readonly authToken: string | null;
  readonly expired: boolean;
  readonly expires: number | null;
  readonly groups: Array<any>;
  readonly lastAuthTime: number | null;
}

const initialState: SessionState = {
  authToken: null,
  authTime: null,
  expired: false,
  expires: null,
  groups: [],
  lastAuthTime: null,
};

export default function session(
  state: SessionState = initialState,
  action: SessionActions
): SessionState {
  switch (action.type) {
    case 'session/destroy':
      return {
        ...initialState,
        expired: true,
      };

    default:
      return state;
  }
}
