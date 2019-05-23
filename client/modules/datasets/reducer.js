import merge from 'lodash/merge';

import { PROJECT } from 'modules/app/actions';
import { SAMPLES } from './actions';

const initialState = {
  entities: {
    datasets: {},
    samples: {},
    schemas: {},
  },
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
  case PROJECT.SUCCESS:
    return {
      ...state,
      entities: {
        ...state.entities,
        datasets: merge({}, state.entities.datasets, action.payload.entities.datasets),
      },
    };

  case SAMPLES.SUCCESS:
    return {
      ...state,
      entities: {
        ...state.entities,
        samples: {
          ...state.entities.samples,
          [action.meta.datasetId]: action.payload.samples,
        },
        schemas: {
          ...state.entities.samples,
          [action.meta.datasetId]: action.payload.meta.fields,
        },
      },
    };

  default:
    return state;
  }
}
