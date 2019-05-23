import merge from 'lodash/merge';
import { NOTEBOOKS } from './actions';

const initialState = {
  entities: {},
  fetchStatus: {},
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
  case NOTEBOOKS.REQUESTED:
    return {
      ...state,
      fetchStatus: 'loading',
    };

  case NOTEBOOKS.SUCCESS:
    return {
      ...state,
      entities: merge({}, state.entities, {
        [action.payload.name]: action.payload.content,
      }),
      fetchStatus: 'loaded',
    };

  case NOTEBOOKS.FAILED:
    return {
      ...state,
      fetchStatus: 'failed'
    };

  default:
    return state;
  }
}
