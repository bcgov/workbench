import merge from 'lodash/merge';
import union from 'lodash/union';

import {
  LATEST,
  TOPIC,
  USERS,
} from 'modules/forums/actions';

const initialState = {
  entities: {},
  ids: [],
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
  case TOPIC.SUCCESS:
  case LATEST.SUCCESS:
  case USERS.SUCCESS:
    return {
      ...state,
      entities: merge({}, state.entities, action.payload.entities.users),
      ids: union(state.ids, action.payload.result),
    };

  default:
    return state;
  }
}
